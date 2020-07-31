export class Feedback {
  userQuestion: string;
  botResponse: string;
  timestamp: string;
  status: FeedbackStatus;
}

export enum FeedbackStatus {
  relevant = 'relevant',
  wrong = 'wrong',
  off_topic = 'off_topic',
}
