export class Config {
  name: string;
  function: string;
  icon: string;
  primaryColor: string;
  secondaryColor: string;
  mediaSize: number;
  trainingRasa: boolean;
  needTraining: boolean;
  lastTrainingAt: string;
  storage: boolean;
  maintenanceMode: boolean;

  // EMBEDDED
  embeddedIcon: string;
  description: string;
  help: string;
  helpBtn: string;

  // DESCRIPTION
  problematic: string;
  audience: string;

  // UI
  showIntentSearch: boolean;
  dismissQuickReplies: boolean;
  showFeedback: boolean;
  blockTypeText: boolean;
  showRebootBtn: boolean;
}
