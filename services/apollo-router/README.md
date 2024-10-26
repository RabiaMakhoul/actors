# Apollo router

The apollo router is a GraphQL supergraph for the communication between frontends and the backend services.

## Installing and running the service

Generally, everything in docker compose should be runnable directly using `docker compose up`

### Composing the supergraph

When running `docker compose up`, all changes to graphql files should automatically trigger a rebuild of the supergraph, given the graphql file is configured according to [subgraph setup](#adding-a-new-subgraph-setup-subgraph)

For production, the supergraph is generated in CI/CD.

### Running the apollo-router

When a `supergraph.graphql` exists, the router can be spun up with `docker compose up router`.
To automatically generate the supergraph from all the configured services, you should also run the router-autoupdate service: `docker compose up router router-autoupdate`.

## Adding a new subgraph

If you have created a new service, and want the router to serve its subgraph, here is a step by step guide on how to do this:

1. Locate the path of the graphql schema, this should be something like `../../services/{service_name}/api/{service_name}.graphql`.
2. Add the subschema and the dns name to the `supergraph.yaml` (production) and `supergraph.docker.yaml` (development) files. The dns name for docker is the docker compose service name, and the production one would be how the router can reach it on the internal subnet in production.
3. Add the service to the `docker-compose.yml` file.
4. Mount the graphql file (in point 1.) onto the router-autoupdate service in `docker-compose.yml`

After doing these steps, updates to graphql files should automatically propagate to the router and rebuild the supergraph.
