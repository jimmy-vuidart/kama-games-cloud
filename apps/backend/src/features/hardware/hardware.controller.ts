import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { HARDWARE, HardwareId } from '../../data/hardware.constant';

@Controller('hardware')
export class HardwareController {
  constructor(private readonly hardwareService: HardwareService) {}

  @Get()
  get() {
    return HARDWARE;
  }

  @Get('wake/:id')
  @HttpCode(200)
  wakeUp(@Param('id') id: HardwareId) {
    return this.hardwareService.wakeUp(id);
  }

  @Get('health/:id')
  healthCheck(@Param('id') id: HardwareId) {
    return this.hardwareService.healthCheck(id);
  }
}
