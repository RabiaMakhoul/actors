"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    schema: 'api/entries.graphql',
    generates: {
        "./src/generated/graphql.ts": {
            plugins: ['typescript', 'typescript-resolvers'],
        },
    },
};
exports.default = config;
