#!/usr/bin/env node
import { CLIApp, Help, Import, Version } from './cli/index.js';

function bootstrap() {
  const cliApp = new CLIApp();
  cliApp.registerCommands([
    new Help(),
    new Version(),
    new Import(),
  ]);

  cliApp.processCommand(process.argv);
}

bootstrap();
