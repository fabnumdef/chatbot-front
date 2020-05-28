import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Inbox } from '@model/inbox.model';
import { Intent } from '@model/intent.model';
import { IntentService } from '@core/services/intent.service';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { InboxService } from '@core/services/inbox.service';
import { ConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-inbox-intent',
  templateUrl: './inbox-intent.component.html',
  styleUrls: ['./inbox-intent.component.scss']
})
export class InboxIntentComponent extends DestroyObservable implements OnInit {

  @Input() inbox: Inbox;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  intents$: BehaviorSubject<Intent[]>;
  intentForm: FormGroup;
  filteredIntents$: BehaviorSubject<Intent[]> = new BehaviorSubject<Intent[]>([]);
  addIntent = false;
  newIntent = new Intent();
  public intentFilterCtrl: FormControl = new FormControl();

  constructor(private _fb: FormBuilder,
              private _intentService: IntentService,
              private _configService: ConfigService,
              private _inboxService: InboxService) {
    super();
  }

  ngOnInit(): void {
    this.intents$ = this._intentService.fullEntities$;
    this._intentService.fullEntities$.pipe(filter(e => e.length > 0)).subscribe(() => {
      this._initSelectFilter();
      this._initFormGroup();
    });
    this.newIntent.mainQuestion = this.inbox.question;
  }

  editIntent(intent) {
    if (!intent) {
      return;
    }
    this._inboxService.save(<Inbox> {id: this.inbox.id, intent: intent}).subscribe(() => {
      this._configService.getConfig().subscribe();
      this.close.emit(true);
    });
  }

  private _initFormGroup() {
    const intent = this.intents$.value.find(i => i.id === this.inbox.intent?.id);
    this.intentForm = this._fb.group({
      intent: [intent ? intent : null, Validators.required]
    });
  }

  private _initSelectFilter() {
    this.filteredIntents$.next(this.intents$.value.slice());
    this.intentFilterCtrl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this._filterIntents();
      });
  }

  private _filterIntents() {
    if (!this.intents$.value) {
      return;
    }
    // get the search keyword
    let search = this.intentFilterCtrl.value;
    if (!search) {
      this.filteredIntents$.next(this.intents$.value.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the intents
    this.filteredIntents$.next(
      this.intents$.value.filter(intent => {
        return (`${intent.category ? `${intent.category} - ` : ''}${intent.mainQuestion}`)
          .toLowerCase().indexOf(search) > -1;
      })
    );
  }

}
