import customError from "../../errors/customError.js"
import { dataBaseError, missingDataError } from "../../errors/info.js"
import EError from "../../errors/num.js"
import messagesDAO from "../daos/dbManagers/messages.dao.js"

class MessagesRepository{
    async getAllMessages(){
        try {
            return await messagesDAO.getAllMessages()
        } catch (error) {
            return customError.createError({
                name: "Error al obtener los mensajes",
                cause: dataBaseError(error),
                message: "Fallo en el intento de obtener los mensajes",
                code: EError.DATABASE_ERROR
            })
        }
    }

    async saveMessages(user, message){
        try {
            return await messagesDAO.saveMessages(user, message)
        } catch (error) {
            if(!user){
                return customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Nombre de usuario"),
                    message: "Fallo en el intento de crear un mensaje",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            if(!message){
                return customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Mensaje"),
                    message: "Fallo en el intento de crear un mensaje",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            return customError.createError({
                name: "Error al crear un mensaje",
                cause: dataBaseError(error),
                message: "Fallo en el intento de crear un mensajes",
                code: EError.DATABASE_ERROR
            })
        }
    }
}

export default new MessagesRepository()