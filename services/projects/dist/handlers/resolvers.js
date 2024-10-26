"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResolvers = buildResolvers;
function buildResolvers(application) {
    return {
        Query: {
            getProjectById: async function (parent, args, context, info) {
                const project = await application.getProjectById(context, args);
                return project.project;
            }
        }
    };
}
