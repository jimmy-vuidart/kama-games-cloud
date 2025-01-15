#!/usr/bin/node

import { readFileSync } from 'fs';
import { Client, ScpClient } from 'node-scp';
import { homedir } from 'os';

Client({
  host: 'raspberrypi.local',
  port: 22,
  username: 'tidiusff',
  privateKey: readFileSync(`${homedir()}/.ssh/id_rsa`),
}).then(async (client) => {
  console.log('Client connected');

  await executeCommand(client, 'sudo systemctl stop kilsi-world');

  await client.rmdir('/home/tidiusff/server/dist');

  await client.uploadDir('./dist', '/home/tidiusff/server/dist');
  await client.uploadFile('./package.json', '/home/tidiusff/server/package.json');
  await client.uploadFile('./.env', '/home/tidiusff/server/.env');

  await executeCommand(client, 'sudo systemctl start kilsi-world');

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
