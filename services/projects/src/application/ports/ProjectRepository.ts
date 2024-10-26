import { Context } from "../../context";

export interface Project {
    id: string;
    title: string;
}

export interface GetProjectByIdRequest {
    id: string;
}

export interface GetProjectByIdResponse {
    project: Project;
}

export interface ProjectRepository {
    // Query Methods
    getProjectById: (request: GetProjectByIdRequest, context: Context) => Promise<GetProjectByIdResponse>;
}

