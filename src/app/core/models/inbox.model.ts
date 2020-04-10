import { Intent } from './intent.model';

export class Inbox {
  id: number;
  confidence: number;
  question: string;
  response: any;
  timestamp: number;
  status: string;
  intent: Intent;
}
