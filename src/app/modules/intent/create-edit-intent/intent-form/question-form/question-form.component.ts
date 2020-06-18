import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RefDataService } from '@core/services/ref-data.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input() questionForm: FormGroup;
  categories$: BehaviorSubject<string[]>;
  filteredCategories$: Observable<string[]>;

  constructor(private _refDataService: RefDataService) {
  }

  get controls() {
    return this.questionForm.controls;
  }

  async ngOnInit() {
    this.categories$ = this._refDataService.categories$;
    await this._refDataService.loadCategories();
    this.filteredCategories$ = this.questionForm.get('category').valueChanges
      .pipe(
        startWith(''),
        map(category => category ?
          this.categories$.value.filter(option => option.toLowerCase().indexOf(category.toLowerCase()) === 0) :
          this.categories$.value.slice())
      );
  }

  isRequired(controls: AbstractControl) {
    // @ts-ignore
    return !!controls.validator('')?.hasOwnProperty('required');
  }
}
