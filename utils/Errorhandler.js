class Errorhandler extends Error{
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}


export {Errorhandler}