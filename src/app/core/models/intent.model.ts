import { Response } from '@model/response.model';
import { Knowledge } from '@model/knowledge.model';
import { IntentStatus } from '@enum/intent-status.enum';

export class Intent {
  id: string;
  mainQuestion: string;
  status: IntentStatus;
  category: string;

  responses: Response[];
  knowledges: Knowledge[];

  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;

  constructor() {
    this.responses = [new Response()];
    this.knowledges = [];
  }
}
