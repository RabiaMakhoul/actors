"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProjectRepository = void 0;
class PrismaProjectRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProjectById(request, context) {
        const project = await this.prisma.project.findUnique({ where: { id: request.id } });
        if (!project) {
            throw new Error("Project not found");
        }
        return { project };
    }
}
exports.PrismaProjectRepository = PrismaProjectRepository;
