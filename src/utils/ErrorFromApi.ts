class ErrorFromApi extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.message = message;
    }
    toJSON() {
        return {
            message: this.message,
            status: this.status,
        };
    }
}
export default ErrorFromApi;
