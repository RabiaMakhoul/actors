import { PrismaClient } from "@prisma/client";
import { Environment } from "../env";
import { Ports } from "../application/ports";
import { PrismaProjectRepository } from "./ProjectRepository";

export async function setupAdapters(
    environment: Environment
): Promise<Ports> {
    console.log('Connecting to database with URL:', environment.postgresUrl);
    
    const prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
        datasources: {
            db: {
                url: environment.postgresUrl
            }
        }
    });

    try {
        // Test the connection
        await prisma.$connect();
        console.log('Successfully connected to database');
    } catch (error) {
        console.error('Failed to connect to database:', error);
        throw error;
    }

    return {
        projectRepository: new PrismaProjectRepository(prisma),
    };
}
