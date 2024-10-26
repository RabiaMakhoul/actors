FROM ghcr.io/apollographql/router:v1.56.0

COPY services/apollo-router/supergraph.graphql /dist/schema/supergraph.graphql
COPY services/apollo-router/router.yaml /dist/config/router.yaml

EXPOSE 4000

CMD ["--config", "/dist/config/router.yaml", "--supergraph", "/dist/schema/supergraph.graphql"]