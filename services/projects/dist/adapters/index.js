"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAdapters = setupAdapters;
const client_1 = require("@prisma/client");
const ProjectRepository_1 = require("./ProjectRepository");
async function setupAdapters(environment) {
    console.log('Connecting to database with URL:', process.env.DATABASE_URL);
    const prisma = new client_1.PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
        datasourceUrl: environment.postgresUrl,
    });
    try {
        // Test the connection
        await prisma.$connect();
        console.log('Successfully connected to database');
    }
    catch (error) {
        console.error('Failed to connect to database:', error);
        throw error;
    }
    return {
        projectRepository: new ProjectRepository_1.PrismaProjectRepository(prisma),
    };
}
