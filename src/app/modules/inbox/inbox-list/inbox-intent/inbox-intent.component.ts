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
import { RefDataService } from '@core/services/ref-data.service';

@Component({
  selector: 'app-inbox-intent',
  templateUrl: './inbox-intent.component.html',
  styleUrls: ['./inbox-intent.component.scss']
})
export class InboxIntentComponent extends DestroyObservable implements OnInit {

  @Input() inbox: Inbox;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  intents: Intent[];
  allIntents: Intent[];
  intentForm: FormGroup;
  categories$: BehaviorSubject<string[]>;
  filteredIntents$: BehaviorSubject<Intent[]> = new BehaviorSubject<Intent[]>([]);
  addIntent = false;
  modifyIntent = false;
  newIntent = new Intent();
  intentToEdit = null;
  public intentFilterCtrl: FormControl = new FormControl();

  constructor(private _fb: FormBuilder,
              private _intentService: IntentService,
              private _configService: ConfigService,
              private _inboxService: InboxService,
              private _refDataService: RefDataService) {
    super();
  }

  ngOnInit(): void {
    this.categories$ = this._refDataService.categories$;
    this._intentService.fullEntities$.pipe(filter(e => e.length > 0)).subscribe(intents => {
      this.intents = intents.map(i => {
        i.confidence = this.inbox.intentRanking?.find(ir => ir.name === i.id)?.confidence;
        i.confidence = i.confidence ? Math.round(i.confidence * 100) : 0;
        return i;
      });
      this.intents.sort(function(a, b) {
        return a.confidence > b.confidence ? -1 : b.confidence > a.confidence ? 1 : 0;
      });
      this._initSelectFilter();
      this._initFormGroup();
      this.allIntents = this.intents;
    });
    this.newIntent.mainQuestion = this.inbox.question;
  }

  editIntent(intent) {
    if (!intent) {
      this.modifyIntent = false;
      this.addIntent = false;
      return;
    }
    this._inboxService.save(<Inbox> {id: this.inbox.id, intent: intent}).subscribe(() => {
      this._configService.getConfig().subscribe();
      this.close.emit(true);
    });
  }

  getIntent() {
    this._intentService.loadOne(this.intentForm.value.intent.id).subscribe(intent => {
      this.intentToEdit = intent;
      this.modifyIntent = true;
    });
  }

  getFilteredIntents(category) {
    this.intents = category ? this.allIntents.filter((intent: Intent) => {
      return intent.category.includes(category);
    }) : this.allIntents;
    this._initSelectFilter();
  }

  private _initFormGroup() {
    const intent = this.intents.find(i => i.id === this.inbox.intent?.id);
    this.intentForm = this._fb.group({
      intent: [intent ? intent : null, Validators.required]
    });
  }

  private _initSelectFilter() {
    this.filteredIntents$.next(this.intents.slice());
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
    if (!this.intents) {
      return;
    }
    // get the search keyword
    const search = this.intentFilterCtrl.value;
    let keywords;
    if (!search) {
      this.filteredIntents$.next(this.intents.slice());
      return;
    } else {
      // remove accent & special chars
      keywords = search.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().split(' ');
    }
    // filter the intents
    this.filteredIntents$.next(
      this.intents.filter(intent => {
        let find = true;
        for (const k of keywords) {
          find = (`${intent.category ? `${intent.category} - ` : ''}${intent.mainQuestion ? intent.mainQuestion : intent.id}`)
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase().indexOf(k) > -1;
          if (!find) {
            break;
          }
        }
        return find;
      })
    );
  }

}
