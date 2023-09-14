import customError from "../../errors/customError.js";
import { dataBaseError, existingTicket, missingDataError } from "../../errors/info.js";
import EError from "../../errors/num.js";
import ticketDao from "../daos/dbManagers/ticket.dao.js"; 

class TicketRepository{
    async createTicket(email, amount, code){
        try {
            return await ticketDao.createTicket(email, amount, code)
        } catch (error) {
            const ticket = await ticketDao.getTicket(code)
            if(ticket){
                customError.createError({
                    name: "Error al crear el ticket",
                    cause: existingTicket(code),
                    message: "Fallo en el intento de en el intento de crear el ticket",
                    code: EError.NOT_FOUND
                })
            }


            if(!email){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Email"),
                    message: "Fallo en el intento de en el intento de crear el ticket",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            if(!amount){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Precio total"),
                    message: "Fallo en el intento de en el intento de crear el ticket",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            if(!code){
                customError.createError({
                    name: "La informacion esta incompleta",
                    cause: missingDataError("Codigo del ticket"),
                    message: "Fallo en el intento de en el intento de crear el ticket",
                    code: EError.INVALID_TYPES_ERROR
                })
            }

            customError.createError({
                name: "Error al crear el ticket",
                cause: dataBaseError(error),
                message: "Fallo en el intento de en el intento de crear el ticket",
                code: EError.DATABASE_ERROR
            })
            
        }
    }

    async getTickets(code){
        try {
            return await ticketDao.getTicket(code)   
        } catch (error) {
            customError.createError({
                name: "Error al obtener los tickets",
                cause: dataBaseError(Error),
                message: "Fallo en el intento de en el intento de obtener los tickets",
                code: EError.DATABASE_ERROR
            })
        }
    }
}

export default new TicketRepository()