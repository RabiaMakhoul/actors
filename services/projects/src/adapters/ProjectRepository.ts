import { PrismaClient as PrismaClientType } from "@prisma/client";
import { GetProjectByIdRequest, GetProjectByIdResponse, ProjectRepository } from "../application/ports/ProjectRepository";
import { Context } from "../context";

export class PrismaProjectRepository implements ProjectRepository {
    constructor(private readonly prisma: PrismaClientType) {}
    async getProjectById(request: GetProjectByIdRequest, context: Context): Promise<GetProjectByIdResponse> {
        const project = await this.prisma.project.findUnique({ where: { id: request.id } });
        if (!project) {
            throw new Error("Project not found");
        }
        return { project };
    }
}
