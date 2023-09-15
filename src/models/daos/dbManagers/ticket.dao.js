import ticketModel from "../../schemas/ticket.js";

class TicketDAO{
    getTicket = async(code) => {
        const ticket = await ticketModel.findOne({code: code});
        return ticket
    }

    createTicket = async(email, amount, code) => {
        const ticket = {
            code: code,
            amount: amount,
            purchaser: email
        }

        let result = await ticketModel.create(ticket)
        return result
    }
}

export default new TicketDAO()