import { setupAdapters } from "./adapters";
import { buildApplication } from "./application";
import { setupEnvironment } from "./env";
import { ConsoleLogger } from "./lib/Logger";
import { runHandlers } from "./handlers";

async function run() {
    const logger = new ConsoleLogger([], "text");
    const environment = setupEnvironment();
    const adapters = await setupAdapters(environment);
    const application = buildApplication(adapters);
    await runHandlers(logger, environment, application);
}

run();
