import { Response } from '@model/response.model';
import { Knowledge } from '@model/knowledge.model';

export class Intent {
  id: string;
  mainQuestion: string;
  status: string;
  category: string;

  responses: Response[];
  knowledges: Knowledge[];

  createdAt: Date;
  expiresAt: Date;

  constructor() {
    this.responses = [new Response()];
    this.knowledges = [];
  }
}
