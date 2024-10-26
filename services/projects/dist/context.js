"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const Logger_1 = require("./lib/Logger");
const createContext = async (req) => {
    // Get user info from auth token/session
    const user = req.headers['x-user-id'];
    if (!user) {
        throw new Error('Missing required authentication headers');
    }
    return {
        user,
        logger: new Logger_1.ConsoleLogger([], "text"),
    };
};
exports.createContext = createContext;
