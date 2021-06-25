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
  isTree: boolean;

  // EMBEDDED
  embeddedIcon: string;
  description: string;
  help: string;
  helpBtn: string;
  chatBtn: string;
  faqBtn: string;
  showFaq: boolean;

  // DESCRIPTION
  problematic: string;
  audience: string;

  // UI
  showIntentSearch: boolean;
  dismissQuickReplies: boolean;
  showFeedback: boolean;
  blockTypeText: boolean;
  showRebootBtn: boolean;
  delayBetweenMessages: number;
}
