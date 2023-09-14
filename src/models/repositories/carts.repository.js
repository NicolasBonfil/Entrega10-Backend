import customError from "../../errors/customError.js"
import { dataBaseError, invalidData, missingDataError, nonExistentCart, nonexistentProduct } from "../../errors/info.js"
import EError from "../../errors/num.js"
import cartsDAO from "../daos/dbManagers/carts.dao.js"
import cartsModel from "../schemas/carts.js"

class CartsRepository{
    async getCartProducts(cid){
        try {
            return await cartsDAO.getCartProducts(cid) 
        } catch (error){
            if(!cid){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del carrito"),
                    message: "Fallo en el intento de obtener el carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }
        
            const cart = await cartsModel.findOne({_id: cid})
            if(!cart){
                customError.createError({
                    name: "Error al obtener el carrito",
                    cause: nonExistentCart(cid),
                    message: "Fallo en el intento de obtener el carrito solicitado",
                    code: EError.NOT_FOUND
                })
            }

            customError.createError({
                name: "Error al obtener el carrito",
                cause: dataBaseError(error),
                message: "Fallo en el intento de obtener el carrito",
                code: EError.DATABASE_ERROR
            })
        }
    }

    async createCart(){
        try {
            return await cartsDAO.createCart()
        } catch (error) {
            customError.createError({
                name: "Error al crear el carrito",
                cause: dataBaseError(error),
                message: "Fallo en el intento de crear el carrito",
                code: EError.DATABASE_ERROR
            })
        }
    }

    async addProductToCart(cid, pid){
        try{
            return await cartsDAO.addProductToCart(cid, pid)
        } catch (error) {
            if(!cid){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del carrito"),
                    message: "Fallo en el intento de agregar el producto al carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            if(!pid){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del producto"),
                    message: "Fallo en el intento de agregar el producto al carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }
        
            const cart = await cartsModel.findOne({_id: cid})
            if(!cart){
                customError.createError({
                    name: "Error al obtener el carrito",
                    cause: nonExistentCart(cid),
                    message: "Fallo en el intento de agregar el producto al carrito",
                    code: EError.NOT_FOUND
                })
            }

            customError.createError({
                name: "Error al agregar el producto al carrito",
                cause: dataBaseError(error),
                message: "Fallo en el intento de agregar el producto al carrito",
                code: EError.DATABASE_ERROR
            })
        }
    }

    async removeProductFromCart(cid, pid){
        try{
            return await cartsDAO.removeProductFromCart(cid, pid)
        } catch (error) {
            if(!cid){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del carrito"),
                    message: "Fallo en el intento de eliminar el producto del carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            if(!pid){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del producto"),
                    message: "Fallo en el intento de eliminar el producto del carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            if(!cart){
                customError.createError({
                    name: "Error al obtener el carrito",
                    cause: nonExistentCart(cid),
                    message: "Fallo en el intento de eliminar el producto del carrito",
                    code: EError.NOT_FOUND
                })
            }

            const productIndex = cart.productsInCart.findIndex(p => p.product._id == pid);
            if(productIndex === -1){
                customError.createError({
                    name: "Error al obtener el producto solicitado",
                    cause: nonexistentProduct(pid),
                    message: "Fallo en el intento de eliminar el producto del carrito",
                    code: EError.NOT_FOUND
                })
            }

            customError.createError({
                name: "Error al eliminar el producto del carrito",
                cause: dataBaseError(error),
                message: "Fallo en el intento de en el intento de eliminar el producto del carrito",
                code: EError.DATABASE_ERROR
            })
        }
    }

    async updateCartProducts(cid, products){
        try{
            return await cartsDAO.updateCartProducts(cid, products)
        } catch (error) {
            if(!cid){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del carrito"),
                    message: "Fallo en el intento de actualizar los productos del carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            if(!products){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Productos"),
                    message: "Fallo en el intento de actualizar los productos del carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }
        
            products.forEach(p => {
                if(!p.product._id){
                    customError.createError({
                        name: "La informacion esta incompleta",
                        cause: missingDataError("Id del producto"),
                        message: "Fallo en el intento de actualizar los productos del carrito",
                        code: EError.INVALID_TYPES_ERROR
                    })
                }

                if(!p.quantity){
                    customError.createError({
                        name: "La informacion esta incompleta",
                        cause: missingDataError("Cantidad del producto"),
                        message: "Fallo en el intento de actualizar los productos del carrito",
                        code: EError.INVALID_TYPES_ERROR
                    })
                }
            })

            const cart = await cartsModel.findOne({_id: cid})
            if(!cart){
                customError.createError({
                    name: "Error al obtener el carrito",
                    cause: nonExistentCart(cid),
                    message: "Fallo en el intento de actualizar los productos del carrito",
                    code: EError.NOT_FOUND
                })
            }

            customError.createError({
                name: "Error al actualizar los productos del carrito",
                cause: dataBaseError(error),
                message: "Fallo en el intento de en el intento de actualizar los productos del carrito",
                code: EError.DATABASE_ERROR
            })
        }
    }

    async updateProductQuantity(cid, pid, quantity){
        try{
            return await cartsDAO.updateProductQuantity(cid, pid, quantity)
        } catch (error) {
            if(!cid){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del carrito"),
                    message: "Fallo en el intento de actualizar la cantidad del producto en el carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            if(!pid){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del producto"),
                    message: "Fallo en el intento de actualizar la cantidad del producto en el carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            if(!quantity){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Cantidad del producto"),
                    message: "Fallo en el intento de actualizar la cantidad del producto en el carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            const cart = await cartsModel.findOne({_id: cid})
            if(!cart){
                customError.createError({
                    name: "Error al obtener el carrito",
                    cause: nonExistentCart(cid),
                    message: "Fallo en el intento de actualizar la cantidad del producto en el carrito",
                    code: EError.NOT_FOUND
                })
            }

            const productIndex = cart.productsInCart.findIndex(p => p.product._id == pid);
            if(productIndex === -1){
                customError.createError({
                    name: "Error al obtener el producto solicitado",
                    cause: nonexistentProduct(pid),
                    message: "Fallo en el intento de actualizar la cantidad del producto en el carrito",
                    code: EError.NOT_FOUND
                })
            }
            

            if (!(Number.isInteger(quantity)) || typeof quantity !== "number" || quantity <= 0){
                customError.createError({
                    name: "El tipo de dato de la informacion es invalido",
                    cause: invalidData(quantity),
                    message: "Fallo en el intento de actualizar la cantidad del producto en el carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            customError.createError({
                name: "Error al actualizar la cantidad del producto en el carrito",
                cause: dataBaseError(error),
                message: "Fallo en el intento de en el intento de actualizar la cantidad del producto en el carrito",
                code: EError.DATABASE_ERROR
            })
        }
    }

    async deleteCartProducts(cid){
        try{
            return await cartsDAO.deleteCartProducts(cid)
        } catch (error) {
            if(!cid){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del carrito"),
                    message: "Fallo en el intento de eliminar los productos del carrito",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            const cart = await cartsModel.findOne({_id: cid})
            if(!cart){
                customError.createError({
                    name: "Error al obtener el carrito",
                    cause: nonExistentCart(cid),
                    message: "Fallo en el intento de eliminar los productos del carrito",
                    code: EError.NOT_FOUND
                })
            }

            customError.createError({
                name: "Error al eliminar los productos del carrito",
                cause: dataBaseError(error),
                message: "Fallo en el intento de en el intento de eliminar los productos del carrito",
                code: EError.DATABASE_ERROR
            })
        }
    }
}

export default new CartsRepository()