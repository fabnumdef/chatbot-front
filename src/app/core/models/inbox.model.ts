import { Intent } from './intent.model';
import { InboxStatus } from '@enum/inbox-status.enum';
import { User } from '@model/user.model';

export class Inbox {
  id: number;
  confidence: number;
  intentRanking: {name: string, confidence: number}[];
  question: string;
  response: any[];
  timestamp: number;
  status: InboxStatus;
  intent: Intent;
  user?: User;
}
