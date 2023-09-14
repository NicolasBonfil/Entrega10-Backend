import { SaveUserDTO } from "../models/dtos/user.dto.js"
import passport from "./passport.middleware.js"

const passportControl = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, {session:false}, (error, user, info) => {
            if(error) next(error)
            if(!user) return res.status(401).send({error: info.message ?? `${info}`})

            const userPayload = new SaveUserDTO(user)
            req.user = userPayload

            next()
        })(req, res, next)
    }
}

export default passportControl