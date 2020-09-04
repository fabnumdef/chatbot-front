import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatHelpModalService {
  private _modal: any = null;

  constructor() {
  }

  add(modal: any) {
    this._modal = modal;
  }

  remove() {
    this._modal = null;
  }

  open(data?: any) {
    this._modal.open(data);
  }

  close() {
    this._modal.close();
  }
}
