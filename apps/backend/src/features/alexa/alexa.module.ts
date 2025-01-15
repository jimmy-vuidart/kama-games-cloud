import { Module } from '@nestjs/common';
import { AlexaService } from './alexa.service';
import { AlexaController } from './alexa.controller';
import { HardwareModule } from '../hardware/hardware.module';

@Module({
  imports: [HardwareModule],
  providers: [AlexaService],
  controllers: [AlexaController],
})
export class AlexaModule {}
