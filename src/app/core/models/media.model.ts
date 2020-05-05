import { Intent } from '@model/intent.model';

export class Media {
  id: number;
  file: string;
  createdAt: string;
  addedBy: string;
  size: number;

  intents?: Intent[];
}
