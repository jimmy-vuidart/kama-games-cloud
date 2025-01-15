import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as archiver from 'archiver';
import { format } from 'date-fns';
import { createWriteStream } from 'fs';
import { GAME_SERVERS } from '../../configuration/game-servers';
import { GameServer } from '../../shared/models/game-server';

@Injectable()
export class BackupService {
  private backupFolder = 'C:/Servers/Backup';

  @Cron('0 12 * * *')
  dailyBackup() {
    GAME_SERVERS.forEach((server) => this.backupGameServer(server));
  }

  backupGameServer(server: GameServer) {
    const archive = archiver('zip');
    const outputStream = createWriteStream(
      `${this.backupFolder}/palworld-${format(Date.now(), 'yyyy-MM-dd HH-mm-ss')}.zip`,
    );

    return new Promise<void>((resolve, reject) => {
      archive
        .directory(server.savePath, false)
        .on('error', (err) => reject(err))
        .pipe(outputStream);

      outputStream.on('close', () => resolve());

      archive.finalize();
    });
  }
}
