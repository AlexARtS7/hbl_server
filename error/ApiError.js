class ApiError extends Error {
    constructor(status, message, index) {
        super();
        this.status = status
        this.message = message
        this.index = index
    }

    static badRequest(message, errorType = '') {
        return new ApiError(404, message, errorType)
    }

    static internal(message, errorType) {
        return new ApiError(500, message, errorType)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
    static notImplemented(message) {
        return new ApiError(501, message)
    }
}

module.exports = ApiError