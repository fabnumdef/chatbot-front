import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '@model/media.model';
import { MediaService } from '@core/services/media.service';
import { ToastrService } from 'ngx-toastr';
import { PaginationHelper } from '@model/pagination-helper.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {

  medias$: Observable<Media[]>;
  pagination: PaginationHelper;
  loading$: Observable<boolean>;
  processing$: Observable<boolean>;
  decodeURI = decodeURI;
  mediaReplace: number;
  mediaLink: number;

  constructor(public mediaService: MediaService,
              @Inject(Window) private _window: Window,
              private _toast: ToastrService,
              private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loading$ = this.mediaService.loading$;
    this.processing$ = this.mediaService.processing$;
    this.medias$ = this.mediaService.entities$;
    this.pagination = this.mediaService.pagination;
  }

  deleteMedia(media: Media) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Êtes-vous sûr de vouloir supprimer le média <b>${media.file}</b> ?
<br/>Cette action est irréversible.`
      },
      autoFocus: false
    });

    dialogRef.afterClosed()
      .pipe(filter(r => !!r))
      .subscribe(() => {
        this.mediaService.delete(media).subscribe();
      });
  }

  selectMedia(mediaId: number, link: boolean) {
    if (link) {
      this.mediaReplace = null;
      this.mediaLink = (this.mediaLink === mediaId) ? null : mediaId;
    } else {
      this.mediaLink = null;
      this.mediaReplace = (this.mediaReplace === mediaId) ? null : mediaId;
    }
  }

  uploadMedia($event) {
    const file: File = $event.target.files[0];
    if (!file) {
      return;
    }
    const filesize = (file.size / 1024 / 1024);
    if (filesize > 5) {
      this._toast.error('Le poids du fichier doit être inférieur à 5Mb.', 'Fichier volumineux');
      return;
    }
    this.mediaService.createMedia(file).subscribe();
    $event.target.value = '';
  }

  replaceMedia(mediaId: number, file: File) {
    this.mediaService.replace(mediaId, file).subscribe(() => {
      this.mediaReplace = null;
    });
  }

  get mediaPath() {
    return `${this._window.location.origin}/media/`;
  }

  getMediaExtension(media: Media) {
    const regex = /(?:\.([^.]+))?$/;
    return regex.exec(media.file)[1]?.toUpperCase();
  }

  isFileImage(media: Media) {
    const ext = this.getMediaExtension(media);
    return ['JPG', 'JPEG', 'GIF', 'PNG'].includes(ext);
  }
}
