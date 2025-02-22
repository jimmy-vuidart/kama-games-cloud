import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AlexaIntents, AlexaPayload, RequestType } from '../../shared/models/alexa-payload';
import { AlexaResponse, OutputSpeechType, PlayBehavior } from '../../shared/models/alexa-response';
import { HardwareService } from '../hardware/hardware.service';
import { firstValueFrom } from 'rxjs';
import { HardwareId } from '../../data/hardware.constant';

@Controller('alexa')
export class AlexaController {
  constructor(private readonly hardwareService: HardwareService) {}

  @Post()
  @HttpCode(200)
  alexaRequest(@Body() req: AlexaPayload) {
    console.log(`Request from Alexa = ${req.session.sessionId})`);

    if (req.request.type === RequestType.IntentRequest) {
      return this.processIntentRequest(req);
    } else if (req.request.type === RequestType.LaunchRequest) {
      return this.processLaunchRequest();
    }
  }

  private async processLaunchRequest(): Promise<AlexaResponse> {
    return {
      version: '1.0',
      response: {
        outputSpeech: {
          type: OutputSpeechType.PLAIN_TEXT,
          text: 'Quel PC souhaitez-vous lancer ?',
          playBehavior: PlayBehavior.REPLACE_ENQUEUED,
        },
        reprompt: {
          type: OutputSpeechType.PLAIN_TEXT,
          text: 'Quel PC souhaitez-vous lancer ?',
          playBehavior: PlayBehavior.REPLACE_ENQUEUED,
        },
        shouldEndSession: false,
      },
    };
  }

  private async processIntentRequest(req: AlexaPayload): Promise<AlexaResponse> {
    let message = '';
    if (req.request.intent.name === AlexaIntents.START_SERVER) {
      message = await this.processServerIntentRequest();
    } else if (req.request.intent.name === AlexaIntents.START_COMPUTER) {
      message = await this.processComputerIntentRequest(req);
    } else if (req.request.intent.name === AlexaIntents.FALLBACK_INTENT) {
      message = await this.processFallbackIntent();
    } else {
      message = 'Commande non reconnue';
    }

    return {
      version: '1.0',
      response: {
        outputSpeech: {
          type: OutputSpeechType.PLAIN_TEXT,
          text: message,
          playBehavior: PlayBehavior.REPLACE_ENQUEUED,
        },
        shouldEndSession: true,
      },
    };
  }

  private async processComputerIntentRequest(req: AlexaPayload) {
    let personne: string | undefined = req.request.intent.slots?.personne?.value;
    if (!personne) {
      personne = 'yuna';
    }

    console.log(`Starting le PC de ${personne}`);

    await firstValueFrom(this.hardwareService.wakeUp(personne));
    return `Je démarre le PC de ${personne}`;
  }

  private async processServerIntentRequest() {
    console.log('Starting le serveur de jeu de Kilsi');
    await firstValueFrom(this.hardwareService.wakeUp(HardwareId.KILSICA));
    return 'Je démarre le serveur de Kilsi';
  }

  private async processFallbackIntent() {
    console.log('Intent fallback');
    return "Je n'ai pas compris, il faut réessayer";
  }
}
