class AppError {
    public readonly message: string;
    public readonly statusCode: number;
    public readonly errors: any;

    constructor(message: string, statusCode = 400, errors?: any) {
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export default AppError;
