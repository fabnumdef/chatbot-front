import { Component, Input, OnInit } from '@angular/core';
import { Inbox } from '@model/inbox.model';
import { Intent } from '@model/intent.model';
import { IntentService } from '@core/services/intent.service';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { DestroyObservable } from '@core/utils/destroy-observable';

@Component({
  selector: 'app-inbox-intent',
  templateUrl: './inbox-intent.component.html',
  styleUrls: ['./inbox-intent.component.scss']
})
export class InboxIntentComponent extends DestroyObservable implements OnInit {

  @Input() inbox: Inbox;
  intents$: BehaviorSubject<Intent[]>;
  intentForm: FormGroup;
  filteredIntents$: BehaviorSubject<Intent[]> = new BehaviorSubject<Intent[]>([]);
  public intentFilterCtrl: FormControl = new FormControl();

  constructor(private _fb: FormBuilder,
              private _intentService: IntentService) {
    super();
  }

  ngOnInit(): void {
    this._intentService.loadAll().subscribe(() => {
      this._initSelectFilter();
      this._initFormGroup();
    });
    this.intents$ = this._intentService.fullEntities$;
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
      .pipe(takeUntil(this.destroy$))
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
      this.intents$.value.filter(intent => (intent.category ? `${intent.category} - ` : '' + intent.mainQuestion)
        .toLowerCase().indexOf(search) > -1)
    );
  }

}
