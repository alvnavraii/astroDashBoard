export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public code?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export class NetworkError extends Error {
    constructor(message: string = 'No se puede conectar al servidor. Por favor, verifica tu conexión o inténtalo más tarde.') {
        super(message);
        this.name = 'NetworkError';
    }
}
