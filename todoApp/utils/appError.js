class AppError extends Error {
    constructor() {
        super();
    }
    create({ message = "", statusCode = 400,   data = null }) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        return this;
    }

}
 
module.exports=new AppError();