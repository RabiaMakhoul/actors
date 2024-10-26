import { Context } from "../context";
import { GetProjectByIdRequest, GetProjectByIdResponse, ProjectRepository } from "./ports/ProjectRepository";

// application never import

export interface Dependencies {
    projectRepository: ProjectRepository;
}

export interface Application {
    // getVariableById: (context: Context, request: GetVariableByIdRequest) => Promise<GetVariableByIdResponse>;
    getProjectById: (context: Context, request: GetProjectByIdRequest) => Promise<GetProjectByIdResponse>;
}

export function buildApplication(dependencies: Dependencies): Application {
    return {
        // getVariableById: async (context: Context, request: GetVariableByIdRequest) => {
        //     // More stuff like check project id, and so on. check permissions, whatever we want :)
        //     return dependencies.entriesRepository.getVariableById(request, context);
        // },
        getProjectById: async (context: Context, request: GetProjectByIdRequest) => {
            return dependencies.projectRepository.getProjectById(request, context);
        }
    };
}
