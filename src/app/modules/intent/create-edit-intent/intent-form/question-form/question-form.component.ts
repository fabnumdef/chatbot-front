import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { RefDataService } from '@core/services/ref-data.service';
import { IntentService } from '@core/services/intent.service';
import { DestroyObservable } from '@core/utils/destroy-observable';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent extends DestroyObservable implements OnInit {

  @Input() questionForm: FormGroup;

  categories$: BehaviorSubject<string[]>;

  filteredCategories$: Observable<string[]>;

  constructor(private _refDataService: RefDataService,
              private _intentService: IntentService) {
    super();
  }

  get controls() {
    return this.questionForm.controls;
  }

  async ngOnInit() {
    this.categories$ = this._refDataService.categories$;
    this.filteredCategories$ = this.questionForm.get('category').valueChanges
      .pipe(
        startWith(''),
        map(category => category ?
          this.categories$.value.filter(option => option.toLowerCase().indexOf(category.toLowerCase()) === 0) :
          this.categories$.value.slice())
      );

    this._checkIfIdExist();
  }

  isRequired(controls: AbstractControl) {
    // @ts-ignore
    return !!controls.validator('')?.hasOwnProperty('required');
  }

  private _checkIfIdExist() {
    this.questionForm.get('id').valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(async (id) => {
        if (id === this.questionForm.get('initialId').value || !id) {
          if (this.questionForm.get('id').hasError('exists')) {
            this.questionForm.get('id').setErrors({'exists': null});
            this.questionForm.updateValueAndValidity();
          }
          return;
        }
        await this._intentService.checkId(id).subscribe(exists => {
          if (exists) {
            this.questionForm.get('id').setErrors({'exists': true});
          } else if (this.questionForm.get('id').hasError('exists')) {
            delete this.questionForm.get('id').errors.exists;
          }
          this.questionForm.updateValueAndValidity();
        });
      });
  }
}
