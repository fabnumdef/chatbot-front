import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MediaService } from '../../../../core/services/media.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DestroyObservable } from '../../../../core/utils/destroy-observable';

@Component({
  selector: 'app-media-filter',
  templateUrl: './media-filter.component.html',
  styleUrls: ['./media-filter.component.scss']
})
export class MediaFilterComponent extends DestroyObservable implements OnInit {

  mediaFilters: FormGroup;

  constructor(private _fb: FormBuilder,
              private _mediaService: MediaService) {
    super();
  }

  ngOnInit(): void {
    this.mediaFilters = this._fb.group({
      query: [this._mediaService.currentSearch],
    });
    this.mediaFilters.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(value => {
        this._mediaService.currentSearch = value.query;
        this._mediaService.load().subscribe();
      });
    this._mediaService.load().subscribe();
  }

  get queryFormControl() {
    return this.mediaFilters.get('query');
  }
}
