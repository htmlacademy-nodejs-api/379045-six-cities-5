#!/usr/bin/env node
import { CLIApp, Help, Import, Version, Generate } from './cli/index.js';

function bootstrap() {
  const cliApp = new CLIApp();
  cliApp.registerCommands([
    new Help(),
    new Version(),
    new Import(),
    new Generate(),
  ]);

  cliApp.processCommand(process.argv);
}

bootstrap();
