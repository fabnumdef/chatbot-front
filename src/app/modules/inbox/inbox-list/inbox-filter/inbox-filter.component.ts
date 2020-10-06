import { Component, OnDestroy, OnInit } from '@angular/core';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InboxService } from '@core/services/inbox.service';
import { debounceTime, distinctUntilChanged, startWith, takeUntil } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { RefDataService } from '@core/services/ref-data.service';
import { InboxStatus, InboxStatus_Fr } from '@enum/inbox-status.enum';
import * as moment from 'moment';
import { AuthService } from '@core/services/auth.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-inbox-filter',
  templateUrl: './inbox-filter.component.html',
  styleUrls: ['./inbox-filter.component.scss']
})
export class InboxFilterComponent extends DestroyObservable implements OnInit, OnDestroy {

  inboxFilters: FormGroup;
  categories$: BehaviorSubject<string[]>;
  statutes = Object.keys(InboxStatus);
  inboxStatus_Fr = InboxStatus_Fr;

  constructor(private _fb: FormBuilder,
              public inboxService: InboxService,
              private _refDataService: RefDataService,
              private _authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.categories$ = this._refDataService.categories$;
    this.inboxFilters = this._fb.group({
      query: [this.inboxService.currentSearch],
      categories: [this.inboxService.currentFilters?.categories ? this.inboxService.currentFilters.categories : []],
      statutes: [this.inboxService.currentFilters?.statutes ?
        // tslint:disable-next-line:max-line-length
        this.inboxService.currentFilters.statutes : [InboxStatus.pending, InboxStatus.to_verify, InboxStatus.relevant, InboxStatus.wrong, InboxStatus.off_topic]],
      startDate: [this.inboxService.currentFilters?.startDate ? moment(this.inboxService.currentFilters.startDate, 'DD/MM/yyyy') : null],
      endDate: [this.inboxService.currentFilters?.endDate ? moment(this.inboxService.currentFilters.endDate, 'DD/MM/yyyy') : null],
      assignedTo: [this.inboxService.currentFilters?.assignedTo]
    });
    this.inboxFilters.valueChanges
      .pipe(
        startWith(this.inboxFilters.value),
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(value => {
        this.inboxService.currentSearch = value.query;
        delete value.query;
        value.startDate = value.startDate ? value.startDate.format('DD/MM/yyyy') : null;
        value.endDate = value.endDate ? value.endDate.format('DD/MM/yyyy') : null;
        value.assignedTo = value.assignedTo ? this._authService.user.email : null;
        this.inboxService.currentFilters = value;
        this.inboxService.load().subscribe();
      });
  }

  exportFile() {
    this.inboxService.export().subscribe(res => {
      const blob = new Blob([res], {
        type: 'application/vnd.ms-excel'
      });

      saveAs(blob, `REQUETES.xlsx`);
    });
  }

  ngOnDestroy() {
    this.inboxService.resetFilters();
  }

  get controls() {
    return this.inboxFilters.controls;
  }

}
