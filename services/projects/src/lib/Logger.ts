export class Logger {
    info(message: string, meta?: Record<string, unknown>) {
        console.log(message, meta);
    }

    error(message: string, error?: Error, meta?: Record<string, unknown>) {
        console.error(message, error, meta);
    }
}


export class ConsoleLogger implements Logger {
    private path: string[];
    private logType: "text";

    constructor(path: string[], logType: "text") {
        this.path = path;
        this.logType = logType;
    }

    extend(path: string): Logger {
        return new ConsoleLogger([...this.path, path], this.logType);
    }

    info(message: string, data: Record<string, string>): void {
        console.log(message, data);
    }
    warn(message: string, data?: Record<string, string>): void {
        console.warn(message, data);
    }
    error(
        message: string,
        error: unknown,
        data?: Record<string, string>
    ): void {
        console.error(message, error, data);
    }
}

