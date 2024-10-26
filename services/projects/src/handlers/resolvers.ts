import { GraphQLResolveInfo } from "graphql";
import { Application } from "../application";
import { Context } from "../context";
import { Project, QueryGetProjectByIdArgs, QueryResolvers, ResolverTypeWrapper } from "../generated/graphql";

export function buildResolvers(application: Application): {
    Query: Required<QueryResolvers<Context>>;
    // Mutation: Required<MutationResolvers<Context>>;
} {
    return {
        Query: {
            getProjectById: async function (parent: {}, args: QueryGetProjectByIdArgs, context: Context, info: GraphQLResolveInfo): Promise<ResolverTypeWrapper<Project>> {
                const project = await application.getProjectById(context, args);
                return project.project;
            }
        }
    };
}
