import { Project as GeneratedProject } from "../generated/graphql";

export type Project = Omit<GeneratedProject, "__typename">;
