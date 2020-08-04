export class Feedback {
  userQuestion: string;
  botResponse: string;
  timestamp: number;
  senderId: string;
  status: FeedbackStatus;
}

export enum FeedbackStatus {
  relevant = 'relevant',
  wrong = 'wrong',
  off_topic = 'off_topic',
}

