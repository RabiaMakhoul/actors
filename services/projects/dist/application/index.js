"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApplication = buildApplication;
function buildApplication(dependencies) {
    return {
        // getVariableById: async (context: Context, request: GetVariableByIdRequest) => {
        //     // More stuff like check project id, and so on. check permissions, whatever we want :)
        //     return dependencies.entriesRepository.getVariableById(request, context);
        // },
        getProjectById: async (context, request) => {
            return dependencies.projectRepository.getProjectById(request, context);
        }
    };
}
