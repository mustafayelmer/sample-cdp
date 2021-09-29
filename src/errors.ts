export class InvalidCsvLinesError extends Error {
    constructor(resource: string) {
        super(`Invalid CSV lines for ${resource}`);
    }
}

export class InvalidSqlError extends Error {
    constructor(message: string, sql: string) {
        super(`Sql error with ${message} for ${sql}`);
    }
}

export class EmptyDatamartCodeError extends Error {
    constructor() {
        super(`Datamart code is empty`);
    }
}

export class NotFoundDatamartCodeError extends Error {
    constructor(code: string) {
        super(`Datamart code was not found with value: ${code}`);
    }
}

export class InvalidDatamartCodeError extends Error {
    constructor(type: string) {
        super(`Invalid datamart code with type: ${type}`);
    }
}