import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../core/services/media.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media-layout',
  templateUrl: './media-layout.component.html',
  styleUrls: ['./media-layout.component.scss']
})
export class MediaLayoutComponent implements OnInit {

  processing$: Observable<boolean>;

  constructor(private _mediaService: MediaService) {
  }

  ngOnInit(): void {
    this.processing$ = this._mediaService.processing$;
  }

  uploadMedia($event) {
    const file: File = $event.target.files[0];
    if (!file) {
      return;
    }
    this._mediaService.createMedia(file).subscribe();
    $event.target.value = '';
  }

}
