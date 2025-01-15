export enum OutputSpeechType {
  PLAIN_TEXT = 'PlainText',
}

export enum PlayBehavior {
  REPLACE_ENQUEUED = 'REPLACE_ENQUEUED',
}

interface OutputSpeech {
  type: OutputSpeechType;
  text: string;
  playBehavior: PlayBehavior;
}

export interface AlexaResponse {
  version: string;
  sessionAttributes?: {
    [key: string]: any;
  };
  response: {
    outputSpeech?: OutputSpeech;
    reprompt?: OutputSpeech;
    directives?: any[];
    shouldEndSession: boolean;
  };
}
