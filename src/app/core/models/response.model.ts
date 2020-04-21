import { ResponseType } from '@enum/response-type.enum';

export class Response {
  id: number;
  responseType: ResponseType;
  response: string;
}
