import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HardwareModule } from './features/hardware/hardware.module';
import { AuthModule } from './features/auth/auth.module';
import { AlexaModule } from './features/alexa/alexa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    HardwareModule,
    AlexaModule,

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
