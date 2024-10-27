import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSubgraphSchema } from "@apollo/subgraph";
import cors from "cors";
import express from "express";
import { readFileSync } from "fs";
import gql from "graphql-tag";
import { createServer } from "http";
import { Application } from "../application";
import { Context, createContext } from "../context";
import { Logger } from "../lib/Logger";
import { Environment } from "../env";
import { buildResolvers } from "./resolvers";

export const resolvers = (app: Application) => buildResolvers(app);

export async function runHandlers(
    logger: Logger,
    environment: Environment,
    application: Application
) {
    const app = express();
    const httpServer = createServer(app);

    const typeDefs = gql(readFileSync("./api/projects.graphql", "utf8"));
    const server = new ApolloServer<Context>({
        schema: buildSubgraphSchema([
            {
                typeDefs,
                resolvers: buildResolvers(application),
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
                                operationName:
                                    req.request.operationName ?? "unknown",
                                duration: `${end - start}ms`,
                            });
                        },
                    };
                },
            },
            ApolloServerPluginDrainHttpServer({ httpServer }),
        ],
    });
    await server.start();

    app.use(cors());
    app.use(express.json());
    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async ({ req }) => {
                return await createContext(req);
            },
        })
    );

    await new Promise<void>((resolve) =>
        httpServer.listen(
            {
                port: environment.graphqlPort,
            },
            resolve
        )
    );

    logger.info("Server ready", { port: `${environment.graphqlPort}` });
}
