import customError from "../../errors/customError.js"
import { dataBaseError, existingProduct, missingDataError, nonexistentProduct } from "../../errors/info.js"
import EError from "../../errors/num.js"
import productsDAO from "../daos/dbManagers/products.dao.js"

class ProductsRepository{
    async getProducts(limit, page, filtro, sort){
        try {
            return await productsDAO.getProducts(limit, page, filtro, sort)
        } catch (error) {
            customError.createError({
                name: "Error al obtener los productos",
                cause: dataBaseError(error),
                message: "Fallo en el intento de en el intento de obtener los productos",
                code: EError.DATABASE_ERROR
            })
        }
    }

    async getProductById(id){
        try {
            return await productsDAO.getProductById(id)
        } catch (error) {
            if(!id){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del producto"),
                    message: "Fallo en el intento de obtener el producto",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            const products = await productsDAO.getLeanProducts()
            const existsProduct = products.find(p => p._id == id)
            if(!existsProduct){
                customError.createError({
                    name: "Error al obtener el producto",
                    cause: nonexistentProduct(id),
                    message: "Fallo en el intento de obtener el producto",
                    code: EError.NOT_FOUND
                })
            }

            customError.createError({
                name: "Error al obtener el producto",
                cause: dataBaseError(error),
                message: "Fallo en el intento de en el intento de obtener el producto",
                code: EError.DATABASE_ERROR
            })
        }
    }

    async addProduct(product){
        try {
            return await productsDAO.addProduct(product)
        } catch (error) {
            const products = await productsDAO.getLeanProducts()

            if(!products){
                customError.createError({
                    name: "Error al agregar el producto",
                    cause: missingDataError("Producto"),
                    message: "Fallo en el intento de agregar el producto",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            const existsProduct = products.find(p => p.code == product.code)
            if(existsProduct){
                customError.createError({
                    name: "Error al agregar el producto",
                    cause: existingProduct(product.code),
                    message: "Fallo en el intento de agregar el producto",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            customError.createError({
                name: "Error al agregar el producto",
                cause: dataBaseError(error),
                message: "Fallo en el intento de en el intento de agregar el producto",
                code: EError.DATABASE_ERROR
            })
        }
    }

    async updateProduct(pid, datosActualizados){
        try {
            return await productsDAO.updateProduct(pid, datosActualizados)
        } catch (error) {
            if(!pid){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del producto"),
                    message: "Fallo en el intento de actualizar el producto",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            if(!datosActualizados){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Datos del producto"),
                    message: "Fallo en el intento de actualizar el producto",
                    code: EError.INVALID_TYPES_ERROR
                })
            }
            const products = await productsDAO.getLeanProducts()
    
            const existsProduct = products.find(p => p.code == datosActualizados.code)
            if(existsProduct){
                customError.createError({
                    name: "Error al actualizar el producto",
                    cause: existingProduct(datosActualizados.code),
                    message: "Fallo en el intento de actualizar el producto",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            const product = products.find(p => p._id == pid)
            if(!product){
                customError.createError({
                    name: "Error al obtener el producto",
                    cause: nonexistentProduct(pid),
                    message: "Fallo en el intento de actualizar el producto",
                    code: EError.NOT_FOUND
                })
            }

            customError.createError({
                name: "Error al actualizar el producto",
                cause: dataBaseError(error),
                message: "Fallo en el intento de en el intento de actualizar el producto",
                code: EError.DATABASE_ERROR
            })
        }
    }

    async deleteProduct(pid){
        try {
            return await productsDAO.deleteProduct(pid)
        } catch (error) {
            if(!pid){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Id del producto"),
                    message: "Fallo en el intento de eliminar el producto",
                    code: EError.INVALID_TYPES_ERROR
                })
            }
    
            const products = await productsDAO.getLeanProducts()
            const product = products.find(p => p._id == pid)
            if(!product){
                customError.createError({
                    name: "Error al obtener el producto",
                    cause: nonexistentProduct(pid),
                    message: "Fallo en el intento de eliminar el producto",
                    code: EError.NOT_FOUND
                })
            }

            customError.createError({
                name: "Error al eliminar el producto",
                cause: dataBaseError(error),
                message: "Fallo en el intento de en el intento de eliminar el producto",
                code: EError.DATABASE_ERROR
            })
        }
    }
}

export default new ProductsRepository()