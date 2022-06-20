class ApiError extends Error {
    constructor(status, message, index) {
        super();
        this.status = status
        this.message = message
        this.index = index
    }

    static badRequest({message, index = 0}) {
        return new ApiError(404, message, index)
    }

    static internal(message, index = 0) {
        return new ApiError(500, message, index)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError