
export const config = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,   // Ensure DB_PORT is used
        user: process.env.DB_USER || 'testuser',
        password: process.env.DB_PASSWORD || 'testpass',
        name: process.env.DB_NAME || 'testdb',
    },
    // ... other configurations ...
};

export type Environment = {
    postgresUrl: string;
    graphqlPort: number;
};

export function getRequiredEnvironmentVariable(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}


export function setupEnvironment(): Environment {
    const postgresUrl = process.env.DATABASE_URL || 'postgresql://testuser:testpassword@localhost:5432/testdb';
    return {
        postgresUrl,
        graphqlPort: parseInt(process.env.GRAPHQL_PORT || '4000', 10),
    };
}