import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { IntentService } from '@core/services/intent.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-intent-filter',
  templateUrl: './intent-filter.component.html',
  styleUrls: ['./intent-filter.component.scss']
})
export class IntentFilterComponent extends DestroyObservable implements OnInit {

  intentFilters: FormGroup;

  constructor(private _fb: FormBuilder,
              private _intentService: IntentService) {
    super();
  }

  ngOnInit(): void {
    this.intentFilters = this._fb.group({
      query: [this._intentService.currentSearch],
      categories: [[]]
    });
    this.intentFilters.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(value => {
        this._intentService.currentSearch = value.query;
        this._intentService.load().subscribe();
      });
    this._intentService.load().subscribe();
  }

  get queryFormControl() {
    return this.intentFilters.get('query');
  }

}
