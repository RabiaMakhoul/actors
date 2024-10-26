"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.Logger = void 0;
class Logger {
    info(message, meta) {
        console.log(message, meta);
    }
    error(message, error, meta) {
        console.error(message, error, meta);
    }
}
exports.Logger = Logger;
class ConsoleLogger {
    constructor(path, logType) {
        this.path = path;
        this.logType = logType;
    }
    extend(path) {
        return new ConsoleLogger([...this.path, path], this.logType);
    }
    info(message, data) {
        console.log(message, data);
    }
    warn(message, data) {
        console.warn(message, data);
    }
    error(message, error, data) {
        console.error(message, error, data);
    }
}
exports.ConsoleLogger = ConsoleLogger;
