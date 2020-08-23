#!/usr/bin/env node

import * as yargs from 'yargs';
import { startServices } from './run-services';
import { initRepo } from './init-repository';

const commands: any = {
  run: startServices,
  init: initRepo,
};

const COMMANDS = ['run', 'add', 'remove'];

function getCommandAndArgs(argv: any) {
  const args = argv._;
  if (COMMANDS.includes(args[0])) {
    return { command: args[0], args: args.slice(1) };
  }

  return { command: 'init', args: argv.name || args[0] };
}

function getCommandArgs(args: string[]) {
  if (COMMANDS.includes(args[0])) {
    return args[0];
  }

  return 'init';
}

function run() {
  const argv = yargs.options({
    name: { type: 'string' },
  }).argv;

  const { command, args } = getCommandAndArgs(argv);

  commands[command](args);
}

run();
