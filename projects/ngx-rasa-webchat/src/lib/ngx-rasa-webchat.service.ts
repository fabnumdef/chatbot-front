import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { HttpClient, HttpParams } from '@angular/common/http';

const SESSION_NAME = 'chat_session';

@Injectable({
  providedIn: 'root'
})
export class NgxRasaWebchatService {

  private _url;

  private _socket;
  private _storage;

  constructor(private _http: HttpClient) {

  }

  public connect(url: string, path: string, initPayload: string) {
    this._url = url;
    this._socket = io(url, {
      path,
      transports: ['websocket']
    });
    this._socket.on('connect', () => {
      console.log(`connect:${this._socket.id}`);
      const localId = this.getSessionId();
      this._socket.emit('session_request', {session_id: localId});
    });
    this._socket.on('session_confirm', (sessionObject) => {
      const remoteId = (sessionObject && sessionObject.session_id)
        ? sessionObject.session_id
        : sessionObject;
      console.log(`session_confirm:${this._socket.id} session_id:${remoteId}`);
      const localId = this.getSessionId();
      if (localId !== remoteId) {
        this._storage.clear();

        this._storeLocalSession(SESSION_NAME, remoteId);
        if (initPayload) {
          this.sendMessage(initPayload);
        }
      }
    });
    this._socket.on('connect_error', (error) => {
      console.log(error);
    });

    this._socket.on('error', (error) => {
      console.log(error);
    });

    this._socket.on('disconnect', (reason) => {
      console.log(reason);
    });

    this._socket.on('reconnect_attempt', () => {
      this._socket.io.opts.transports = ['polling', 'websocket'];
    });
  }

  public sendMessage(message) {
    const session_id = this.getSessionId();
    this._socket.emit('user_uttered', {message, session_id});
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this._socket.on('bot_uttered', (message) => {
        observer.next(message);
      });
    });
  };

  public storeConversation(conversation) {
    // Store a conversation List to storage
    const localSession = this._getLocalSession(SESSION_NAME);
    const newSession = {
      // Since immutable List is not a native JS object, store conversation as array
      ...localSession,
      conversation,
      lastUpdate: Date.now()
    };
    this._storage.setItem(SESSION_NAME, JSON.stringify(newSession));
    return conversation;
  }

  public getConversation() {
    // Store a conversation List to storage
    const localSession = this._getLocalSession(SESSION_NAME);
    if (!localSession || !localSession.conversation) {
      return [];
    }
    return localSession.conversation;
  }

  public setStorage(storage) {
    this._storage = (storage === 'session') ? sessionStorage : localStorage;
  }

  public searchIntents(query) {
    let params = new HttpParams();
    params = params.append('query', encodeURIComponent(query));

    return this._http.get(`${this._url}/api/public/intents`, {params});
  }

  public getSessionId() {
    // Get the local session, check if there is an existing session_id
    const localSession = this._getLocalSession(SESSION_NAME);
    return localSession ? localSession.session_id : null;
  }

  private _getLocalSession(key) {
    // Attempt to get local session from storage
    const cachedSession = this._storage.getItem(key);
    let session = null;
    if (cachedSession) {
      // Found existing session in storage
      const parsedSession = JSON.parse(cachedSession);
      // Format conversation from array of object to immutable Map for use by messages components
      const formattedConversation = parsedSession.conversation
        ? parsedSession.conversation
        : [];
      // Create a new session to return
      session = {
        ...parsedSession,
        conversation: formattedConversation
      };
    }
    // Returns a formatted session object if any found, otherwise return undefined
    return session;
  }

  private _storeLocalSession(key, sid) {
    // Attempt to store session id to local storage
    const cachedSession = this._storage.getItem(key);
    let session;
    if (cachedSession) {
      // Found exisiting session in storage
      const parsedSession = JSON.parse(cachedSession);
      session = {
        ...parsedSession,
        session_id: sid
      };
    } else {
      // No existing local session, create a new empty session with only session_id
      session = {
        session_id: sid
      };
    }
    // Store updated session to storage
    this._storage.setItem(key, JSON.stringify(session));
  }
}
