import messagesModel from "../../schemas/messages.js";

class MessagesDAO{
    getAllMessages = () => {
        
        try {
            let messages = messagesModel.find().lean();
            if(!messages){
                messages = []
            }
            return messages
        } catch (error) {
            return error
        }
    }

    saveMessages = async (user, message) => {
        try {
            let result = await messagesModel.create({user, message})
            return result     
        } catch (error) {
            return error
        }
    }
}

export default new MessagesDAO()