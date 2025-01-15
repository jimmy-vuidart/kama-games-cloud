import { Test, TestingModule } from '@nestjs/testing';
import { HardwareController } from './hardware.controller';
import { HardwareService } from './hardware.service';

describe('HardwareController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HardwareController],
      providers: [HardwareService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(HardwareController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
