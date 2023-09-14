import { Router } from "express"
import userModel from "../models/schemas/Users.model.js"
import passport from "passport"
import { generateToken } from "../utils/token.js"
import { createHash } from "../utils/password.js"
import passportControl from "../middlewares/passport-control.middleware.js"
import auth from "../middlewares/auth.middlewares.js"

const authMid = [
    passportControl("jwt"),
    auth("user")
]

const router = Router()

router.post("/register", passport.authenticate("register", {passReqToCallback: true, session: false, failureRedirect: "/api/session/failedRegister", failureMessage: true}), (req, res) => {
    res.status(200).send({status: "success", message: "Usuario registrado", payload: req.user._id})
})

router.post("/login", passport.authenticate("login", {passReqToCallback: true, session: false, failureRedirect: "/api/session/failedLogin", failureMessage: true}), (req, res) => {
    const user = req.user
    const access_token = generateToken(user)

    res.cookie("CoderCookie", access_token, {
        maxAge: 60*60*1000,
        httpOnly: true
    })
    res.status(200).send({status:"success", payload: user})
})

router.get("/failedRegister", (req, res) => {
    console.log("error");
    res.status(400).send({message: "Failed register"})
})

router.get("/failedLogin", (req, res) => {
    console.log("error");
    res.status(400).send({message: "Failed login"})
})

router.post("/resetPassword", async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) return res.status(400).send({status: "error", error: "Error user"})
    const user = await userModel.findOne({email})
    if(!user) return res.status(400).send({status: "error", error: "Error userr"})

    user.password = createHash(password)

    const result = await userModel.updateOne({email:email}, user)
    res.status(200).send({payload: result})
})


router.get("/github", passport.authenticate("github", {scope: ["user: email"]})),async (req, res) => {
    res.status(200).send("Usuario logueado con GitHub")
}

router.get("/githubCallback", passport.authenticate("github", {failureRedirect: "/login"})),async (req, res) => {
    req.session.user = req.user
    res.redirect("/products")
}


router.post("/logout", (req, res, next) => {        
        try {
            if(req.session){
                req.session.destroy(err => {
                    if(err){
                        return next(err)
                    }
                })
            }
            res.clearCookie("CoderCookie")
            res.send("Logout")
        } catch (error) {
            next(error)
        }
    
})


router.get("/current", authMid, async (req, res) => {
    const user = req.user
    res.send(user)
    //res.render("current", {user})
})

export default router