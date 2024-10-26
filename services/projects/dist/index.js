"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("./adapters");
const application_1 = require("./application");
const env_1 = require("./env");
const Logger_1 = require("./lib/Logger");
const handlers_1 = require("./handlers");
async function run() {
    const logger = new Logger_1.ConsoleLogger([], "text");
    const environment = (0, env_1.setupEnvironment)();
    const adapters = await (0, adapters_1.setupAdapters)(environment);
    const application = (0, application_1.buildApplication)(adapters);
    await (0, handlers_1.runHandlers)(logger, environment, application);
}
run();
