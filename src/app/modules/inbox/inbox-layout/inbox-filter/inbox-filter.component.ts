import { Component, OnInit } from '@angular/core';
import { DestroyObservable } from '../../../../core/utils/destroy-observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InboxService } from '../../../../core/services/inbox.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-inbox-filter',
  templateUrl: './inbox-filter.component.html',
  styleUrls: ['./inbox-filter.component.scss']
})
export class InboxFilterComponent extends DestroyObservable implements OnInit {

  inboxFilters: FormGroup;

  constructor(private _fb: FormBuilder,
              private _inboxService: InboxService) {
    super();
  }

  ngOnInit(): void {
    this.inboxFilters = this._fb.group({
      query: [this._inboxService.currentSearch],
    });
    this.inboxFilters.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(value => {
        this._inboxService.currentSearch = value.query;
        this._inboxService.load().subscribe();
      });
    this._inboxService.load().subscribe();
  }

}
