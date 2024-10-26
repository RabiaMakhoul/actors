"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.runHandlers = runHandlers;
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const subgraph_1 = require("@apollo/subgraph");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const http_1 = require("http");
const context_1 = require("../context");
const resolvers_1 = require("./resolvers");
// Export resolvers as a function to receive the application instance
const resolvers = (app) => (0, resolvers_1.buildResolvers)(app);
exports.resolvers = resolvers;
async function runHandlers(logger, environment, application) {
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    const typeDefs = (0, graphql_tag_1.default)((0, fs_1.readFileSync)("./api/projects.graphql", "utf8"));
    const server = new server_1.ApolloServer({
        schema: (0, subgraph_1.buildSubgraphSchema)([
            {
                typeDefs,
                resolvers: (0, resolvers_1.buildResolvers)(application),
            },
        ]),
        introspection: true,
        plugins: [
            {
                unexpectedErrorProcessingRequest: async ({ error }) => {
                    logger.error("Unexpected error processing request", error);
                },
                requestDidStart: async (req) => {
                    const start = Date.now();
                    req.contextValue.logger.info("Request started", {
                        operationName: req.request.operationName ?? "unknown",
                    });
                    return {
                        willSendResponse: async () => {
                            const end = Date.now();
                            req.contextValue.logger.info("Request finished", {
                                operationName: req.request.operationName ?? "unknown",
                                duration: `${end - start}ms`,
                            });
                        },
                    };
                },
            },
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
        ],
    });
    await server.start();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/graphql", (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            return await (0, context_1.createContext)(req);
        },
    }));
    await new Promise((resolve) => httpServer.listen({
        port: environment.graphqlPort,
    }, resolve));
    logger.info("Server ready", { port: `${environment.graphqlPort}` });
}
