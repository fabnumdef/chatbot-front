import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { IntentService } from '@core/services/intent.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RefDataService } from '@core/services/ref-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { UserService } from '@core/services/user.service';
import { User } from '@model/user.model';
import { UserRole_Fr } from '@enum/*';

@Component({
  selector: 'app-intent-filter',
  templateUrl: './intent-filter.component.html',
  styleUrls: ['./intent-filter.component.scss'],
})
export class IntentFilterComponent extends DestroyObservable implements OnInit, OnDestroy {
  @Input() light = false;

  @Input() standalone = false;

  @Output() intentFilterChanges: EventEmitter<any> = new EventEmitter<any>();

  intentFilters: FormGroup;

  categories$: BehaviorSubject<string[]>;

  users$: Observable<User[]>;

  userRole_fr = UserRole_Fr;

  constructor(private _fb: FormBuilder,
              private _intentService: IntentService,
              private _refDataService: RefDataService,
              private _userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.categories$ = this._refDataService.categories$;
    this.users$ = this._userService.cleanEntities$;
    this.intentFilters = this._fb.group({
      query: [!this.standalone ? this._intentService.currentSearch : ''],
      categories: [this._intentService.currentFilters?.categories && !this.standalone ? this._intentService.currentFilters.categories : []],
      users: [this._intentService.currentFilters?.users && !this.standalone ? this._intentService.currentFilters.users : []],
      intentInError: [this._intentService.currentFilters?.intentInError ? this._intentService.currentFilters.intentInError : false],
      hidden: [this._intentService.currentFilters?.hidden ? this._intentService.currentFilters.hidden : false],
      expires: [this._intentService.currentFilters?.expires ? this._intentService.currentFilters.expires : false],
      expiresAt: [this._intentService.currentFilters?.expiresAt ? moment(this._intentService.currentFilters.expiresAt, 'DD/MM/yyyy') : null]
    });
    this.intentFilters.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(value => {
        if (this.standalone) {
          this.intentFilterChanges.emit({
            query: value.query,
            categories: value.categories,
            users: value.users
          });
          return;
        }
        this._intentService.currentSearch = value.query;
        delete value.query;
        value.expiresAt = value.expiresAt ? value.expiresAt.format('DD/MM/yyyy') : null;
        this._intentService.currentFilters = value;
        this._intentService.load().subscribe();
      });
    if (!this.standalone) {
      this._intentService.load().subscribe();
    }
  }

  ngOnDestroy() {
    if (!this.standalone) {
      this._intentService.resetFilters();
    }
  }

  get controls() {
    return this.intentFilters.controls;
  }
}
