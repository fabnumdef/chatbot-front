import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Intent } from '@model/intent.model';
import { takeUntil } from 'rxjs/operators';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { IntentService } from '@core/services/intent.service';

@Component({
  selector: 'app-quick-reply-form',
  templateUrl: './quick-reply-form.component.html',
  styleUrls: ['./quick-reply-form.component.scss']
})
export class QuickReplyFormComponent extends DestroyObservable implements OnInit {

  @Input() responseFormControl: FormControl;
  quickRepliesForm: FormArray;
  intents: Intent[];
  filteredIntents$: BehaviorSubject<Intent[]> = new BehaviorSubject<Intent[]>([]);
  public intentFilterCtrl: FormControl = new FormControl();

  constructor(private _fb: FormBuilder,
              private _intentService: IntentService) {
    super();
  }

  ngOnInit(): void {
    this._intentService.fullEntities$.subscribe(intents => {
      this.intents = intents;
      this._initSelectFilter();
      this._initFormArray();
      this._subscribeFormArray();
    });
  }

  get quickRepliesFormGroups(): FormGroup[] {
    return <FormGroup[]> this.quickRepliesForm.controls;
  }

  addChoice() {
    this.quickRepliesForm.push(this._initFormGroup());
  }

  deleteChoice(idx: number) {
    this.quickRepliesForm.removeAt(idx);
  }

  private _initFormArray() {
    this.quickRepliesForm = this._fb.array([]);

    const value = this.responseFormControl.value;
    if (!value) {
      return this.quickRepliesForm.push(this._initFormGroup());
    }
    value.split(';').forEach(v => {
      const intentId = v.substring(v.indexOf('<') + 1, v.indexOf('>')).trim();
      this.quickRepliesForm.push(this._initFormGroup({
        text: v.substring(0, v.indexOf('<')).trim(),
        intent: this.intents.find(i => i.id === intentId)
      }));
    });
  }

  private _initFormGroup(quickReply?: any): FormGroup {
    return this._fb.group({
      text: [quickReply ? quickReply.text : null, [Validators.required, Validators.maxLength(200)]],
      intent: [quickReply ? quickReply.intent : null, Validators.required]
    });
  }

  private _subscribeFormArray() {
    this.quickRepliesForm.valueChanges.subscribe(value => {
      if (!this.quickRepliesForm.valid) {
        return this.responseFormControl.setValue(null);
      }
      this.responseFormControl.setValue(
        value.map(v => `${v.text} <${v.intent.id}>`).join(';')
      );
      this.responseFormControl.markAsDirty();
    });
  }

  private _initSelectFilter() {
    this.filteredIntents$.next(this.intents.slice());
    this.intentFilterCtrl.valueChanges
      .pipe(takeUntil(this.destroy$))
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
      keywords = search.toLowerCase().split(' ');
    }
    // filter the intents
    this.filteredIntents$.next(
      this.intents.filter(intent => {
        let find = true;
        for (const k of keywords) {
          find = (`${intent.category ? `${intent.category} - ` : ''}${intent.mainQuestion ? intent.mainQuestion : intent.id}`)
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
