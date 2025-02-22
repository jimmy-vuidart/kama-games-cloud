#!/usr/bin/node

import { readFileSync } from 'fs';
import { Client, ScpClient } from 'node-scp';
import { homedir } from 'os';

// let remotePath = '/home/tidiusff/server';
let remotePath = '/share/CACHEDEV1_DATA/Applications/Kilsiworld/Backend';

Client({
  host: 'KAMA-NAS',
  port: 22,
  username: 'tidiusff',
  privateKey: readFileSync(`${homedir()}/.ssh/id_rsa`),
}).then(async (client) => {
  console.log('Client connected');

  // await executeCommand(client, 'sudo systemctl stop kilsi-world');
  try {
    await client.rmdir(`${remotePath}/dist`);
  } catch (err) {
    console.log('No folder to remove');
  }

  await client.uploadDir('./dist', `${remotePath}/dist`);
  await client.uploadFile('./package.json', `${remotePath}/package.json`);
  await client.uploadFile('./.env', `${remotePath}/.env`);
  await client.uploadFile('./Dockerfile', `${remotePath}/Dockerfile`);

  // await executeCommand(client, 'sudo systemctl start kilsi-world');
  await executeCommand(client, 'npm i --omit dev');

  console.log('Upload successful');

  client.close();
});

function executeCommand(client: ScpClient, command: string): Promise<void> {
  console.log(`Executing ${command}`);
  return new Promise<void>((resolve, reject) => {
    client.sshClient?.exec(command, (err, stream) => {
      if (err) console.error(err);
      stream
        .on('close', (data: string) => {
          console.log('STDOUT: ' + data);
          resolve();
        })
        .on('data', (data: string) => {
          console.log('STDOUT: ' + data);
          resolve();
        })
        .stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
          reject();
        });
    });
  });
}
