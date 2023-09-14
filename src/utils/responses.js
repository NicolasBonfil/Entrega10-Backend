export const successResponse = (data) => {
    return {
        success: true,
        payload: data
    }
};

export const HTTP_STATUS = {  
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
    NOT_FOUND: 404
};
 
export class HttpError {
    constructor(description, status = 500) {
        this.description = description;
        this.status = status;
    }
}