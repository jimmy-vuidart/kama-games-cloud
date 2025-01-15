export interface AlexaSession {
  new: boolean;
  sessionId: string;
  application: {
    applicationId: string;
  };
  attributes: any;
  user: {
    userId: string;
  };
  affiliatedResources: any[];
}
