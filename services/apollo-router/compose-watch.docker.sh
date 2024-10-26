#!/bin/bash
trapper() {
    echo "Shutting down..."
    kill $NOTIFY_PID
    exit 0
}

trap trapper INT TERM

# Generate supergraph initially
npx -y @apollo/rover supergraph compose --elv2-license accept --config ./supergraph.docker.yaml > ./supergraph.graphql

# Watch for changes in the supergraph and router configuration files, and regenerate the supergraph when changes are detected.
inotifywait -m -e modify,create,delete,move ./api/*.graphql ./supergraph.docker.yaml ./router.docker.yaml |
while read -r path action file; do
    echo "Detected $action on $file"
    npx -y @apollo/rover supergraph compose --elv2-license accept --config ./supergraph.docker.yaml > ./supergraph.graphql
done &

NOTIFY_PID=$!

wait $NOTIFY_PID
