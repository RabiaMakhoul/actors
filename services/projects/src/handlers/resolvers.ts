import { GraphQLResolveInfo } from "graphql";
import { Application } from "../application";
import { Context } from "../context";
import { MutationCreateProjectArgs, MutationResolvers, QueryGetProjectByIdArgs, QueryResolvers, ResolverTypeWrapper } from "../generated/graphql";
import { Project } from "../domain/Project";

export function buildResolvers(application: Application): {
    Query: Required<QueryResolvers<Context>>;
    Mutation: Required<MutationResolvers<Context>>;
} {
    return {
        Query: {
            getProjectById: async function (parent: {}, args: QueryGetProjectByIdArgs, context: Context, info: GraphQLResolveInfo): Promise<ResolverTypeWrapper<Project>> {
                const project = await application.getProjectById(context, args);
                return project.project;
            }
        },
        Mutation: {
            createProject: async function (parent: {}, args: MutationCreateProjectArgs, context: Context, info: GraphQLResolveInfo): Promise<ResolverTypeWrapper<Project>> {
                const project = await application.createProject(context, args.input);
                return project.project;
            }
        }
    };
}

