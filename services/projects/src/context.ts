import { ConsoleLogger, Logger } from "./lib/Logger";
import { Request } from 'express';

export interface Context {
    // user: string;
    logger: Logger;
}

export const createContext = async (req: Request): Promise<Context> => {
    // Get user info from auth token/session
    // const user = req.headers['x-user-id'] as string;

    // if (!user) {
        // throw new Error('Missing required authentication headers');
    // }

    return {
        // user,
        logger: new ConsoleLogger([], "text"),
    };
};
