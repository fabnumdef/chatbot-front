import { ResponseType } from '@enum/response-type.enum';
import { Intent } from '@model/intent.model';

export class Response {
  id: number;
  responseType: ResponseType;
  response: string;

  intentId?: string;


  constructor(intent?: Intent) {
    if (intent) {
      this.intentId = intent.id;
    }
  }
}
