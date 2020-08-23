#!/usr/bin/env node

import * as shell from 'shelljs';
import * as fs from 'fs';

export async function startServices(name: string): Promise<void> {
  if (fs.existsSync(name)) {
    shell.cd(name);
  }
  shell.cd('backend/services/config-service');
  shell.exec('docker-compose up -d', { silent: true });
  shell.exec('npm run start', { async: true });

  shell.cd('../metrics-service');
  shell.exec('docker-compose up -d', { silent: true });
  shell.exec('npm run start', { async: true });

  shell.cd('../../api-gw');
  shell.exec('npm run start', { async: true });
}
