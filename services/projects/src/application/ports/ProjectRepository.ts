import { Context } from "../../context";

export interface Project {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface GetProjectByIdRequest {
    id: string;
}

export interface GetProjectByIdResponse {
    project: Project;
}

export interface CreateProjectRequest {
    title: string;
}

export interface CreateProjectResponse {
    project: {
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

export interface ProjectRepository {
    // Query Methods
    getProjectById: (request: GetProjectByIdRequest, context: Context) => Promise<GetProjectByIdResponse>;
    createProject: (request: CreateProjectRequest, context: Context) => Promise<CreateProjectResponse>;
}
