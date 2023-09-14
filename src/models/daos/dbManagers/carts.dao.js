import cartsModel from "../../schemas/carts.js"

class CartDAO{
    createCart = async () => {
        const products = []
        const cart = {
            products
        }

        try {
            let result = await cartsModel.create(cart)
            return result  
        } catch (error) {
            return error
        }
    }

    getCartProducts = async (cid) => {
        try {
            const carrito = await cartsModel.findOne({_id: cid}).populate("productsInCart.product").lean(true)
            return (carrito.productsInCart) 
        } catch (error) {
            return error
        }
    }

    addProductToCart = async (cid, pid) => {
        try {
            const cart = await cartsModel.findOne({_id: cid})
            const productIndex = cart.productsInCart.findIndex(p => p.product._id == pid);
    
            const product = {_id: pid}
    
            if(productIndex == -1){
                let quantity = 1
                cart.productsInCart.push({quantity, product})
            }else{
                cart.productsInCart[productIndex].quantity = parseInt(cart.productsInCart[productIndex].quantity)+1;
            }

            await cartsModel.updateOne({_id: cart.id }, cart);
            return cart    
        } catch (error) {
            return error
        }

    }

    removeProductFromCart = async (cid, pid) => {
        try {
            const cart = await cartsModel.findOne({_id: cid})
    
            const productIndex = cart.productsInCart.findIndex(p => p.product._id == pid);
            if(productIndex === -1) return error
    
            cart.productsInCart.splice(productIndex, 1)

            await cartsModel.updateOne({_id: cart.id }, cart);
            return cart
            
        } catch (error) {
            return error
        }
    }

    updateCartProducts = async (cid, products) => {
        const productsToAdd = []
        
        try {
            const cart = await cartsModel.findOne({_id: cid})
    
            products.forEach(p => {
                //if(!p.product._id || !p.quantity) return error  
                
                let id = p.product._id
                let quantity = p.quantity
                if(productsToAdd.find(prod => prod.product._id == id)){
                    const producto = productsToAdd.find(prod => prod.product._id == id)
                    producto.quantity += quantity
                }else{
                    productsToAdd.push({quantity, product:{_id:id}})
                }
            })
    
            cart.productsInCart = productsToAdd
    
            await cartsModel.updateOne({_id: cart.id }, cart);
            return cart
            
        } catch (error) {
            return error
        }
    }

    updateProductQuantity = async (cid, pid, selectedQuantity) => {
        try {
            if (typeof selectedQuantity !== "number" || selectedQuantity <= 0 || !(Number.isInteger(selectedQuantity))) return error
    
            const cart = await cartsModel.findOne({_id: cid})
    
            const productIndex = cart.productsInCart.findIndex(p => p.product._id == pid);
            if(productIndex === -1) return error
    
            cart.productsInCart[productIndex].quantity = selectedQuantity
    
            await cartsModel.updateOne({_id: cart.id }, cart);
            return cart
            
        } catch (error) {
            return error
        }
    }

    deleteCartProducts = async (cid) => {
        try {
            const cart = await cartsModel.findOne({_id: cid})
            cart.productsInCart = []
    
            await cartsModel.updateOne({_id: cart.id }, cart);
            return cart
        } catch (error) {
            return error
        }
    }
}

export default new CartDAO()

