import { Intent } from './intent.model';
import { InboxStatus } from '@enum/inbox-status.enum';

export class Inbox {
  id: number;
  confidence: number;
  question: string;
  response: any[];
  timestamp: number;
  status: InboxStatus;
  intent: Intent;
}
