import { AlexaSession } from './alexa-session';

export enum RequestType {
  LaunchRequest = 'LaunchRequest',
  IntentRequest = 'IntentRequest',
}

export enum AlexaIntents {
  START_COMPUTER = 'start_computer',
  START_SERVER = 'start_server',
  FALLBACK_INTENT = 'AMAZON.FallbackIntent',
}

enum ConfirmationStatus {
  NONE = 'NONE',
}

export interface AlexaSlot {
  name: string;
  value: string;
  confirmationStatus: string;
  source: string;
  slotValue: {
    type: string;
    value: string;
  };
}

export interface AlexaRequestIntent {
  name: AlexaIntents;
  confirmationStatus: ConfirmationStatus;
  slots?: { [key: string]: AlexaSlot | undefined };
}

export interface AlexaRequest {
  type: RequestType;
  requestId: string;
  locale: string;
  timestamp: string;
  intent: AlexaRequestIntent;
}

export interface AlexaPayload {
  session: AlexaSession;
  request: AlexaRequest;
}
