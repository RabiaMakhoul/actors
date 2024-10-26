import { Context } from "../context";
import { 
    CreateProjectRequest,
    CreateProjectResponse,
    GetProjectByIdRequest,
    GetProjectByIdResponse,
    ProjectRepository 
} from "./ports/ProjectRepository";

// application never import

export interface Dependencies {
    projectRepository: ProjectRepository;
}

export interface Application {
    getProjectById: (context: Context, request: GetProjectByIdRequest) => Promise<GetProjectByIdResponse>;
    createProject: (context: Context, request: CreateProjectRequest) => Promise<CreateProjectResponse>;
}

export function buildApplication(dependencies: Dependencies): Application {
    return {
        getProjectById: async (context: Context, request: GetProjectByIdRequest) => {
            return dependencies.projectRepository.getProjectById(request, context);
        },
        createProject: async (context: Context, request: CreateProjectRequest) => {
            return dependencies.projectRepository.createProject(request, context);
        }
    };
}
