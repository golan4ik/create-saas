#!/usr/bin/env node

import * as prompts from 'prompts';
import * as shell from 'shelljs';
import * as chalk from 'chalk';
import elegantSpinner = require('elegant-spinner');
import logUpdate = require('log-update');

const frame = elegantSpinner();

const questions: prompts.PromptObject[] = [
  {
    type: 'select',
    name: 'sourceControl',
    message: 'Choose source control',
    choices: [
      { title: 'Decide later', value: 'later' },
      { title: 'Github', value: 'github' },
      { title: 'Bitbucket', value: 'bitbucket' },
      { title: 'Gitlab', value: 'gitlab' },
    ],
  },
  {
    type: 'select',
    name: 'saasEssentials',
    message: 'Include SaaS essentials',
    choices: [
      { title: 'Decide later', value: 'later' },
      { title: 'Yes', value: 'yes' },
    ],
  },
];

export async function initRepo(name: string): Promise<void> {
  let projectName = name;
  while (!projectName.length) {
    const response = await prompts({
      type: 'text',
      name: 'project',
      message: 'Choose project name',
    });
    projectName = response.project;
  }

  const { sourceControl, saasEssentials } = await prompts(questions);

  if (sourceControl === 'github') {
    shell.exec('ls .');
  }

  shell.exec(`git clone https://github.com/frontegg/create-saas ${projectName}`, { silent: true });
  const interval = setInterval(() => {
    logUpdate(`${chalk.cyan.bold.dim(frame())} fetching data`);
  },                           80);

  await setTimeout(() => {
    console.log('\n');
    clearInterval(interval);
    logUpdate.clear();
  },               8000);
}
