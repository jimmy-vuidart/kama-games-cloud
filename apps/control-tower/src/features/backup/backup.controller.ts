import { Controller, Get, Param } from '@nestjs/common';
import { GAME_SERVERS } from 'src/configuration/game-servers';
import { BackupService } from './backup.service';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get(':id')
  backupGameServer(@Param('id') id: string) {
    return this.backupService.backupGameServer(
      GAME_SERVERS.find((server) => server.id === id),
    );
  }
}
