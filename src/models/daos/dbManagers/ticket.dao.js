import ticketModel from "../../schemas/ticket.js";

class TicketDAO{
    getTicket = async(code) => {
        try {
            const ticket = await ticketModel.findOne({code: code});
            return ticket
        } catch (error) {
            return error
        }
    }

    createTicket = async(email, amount, code) => {
        const ticket = {
            code: code,
            amount: amount,
            purchaser: email
        }

        try {
            let result = await ticketModel.create(ticket)
            return result
        } catch (error) {
            return error;
        }
    }
}

export default new TicketDAO()