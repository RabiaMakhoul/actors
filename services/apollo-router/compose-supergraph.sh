#!/bin/sh

# Install Rover if it's not already installed, todo: This should be done in a setup script somewhere else.
if ! command -v rover &> /dev/null; then
    echo "Rover is not installed. Installing Rover..."
    curl -sSL https://rover.apollo.dev/nix/v0.26.2 | sh
    export PATH=$PATH:$HOME/.rover/bin
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

rover supergraph compose --elv2-license accept --config ${SCRIPT_DIR}/supergraph.yaml > ${SCRIPT_DIR}/supergraph.graphql