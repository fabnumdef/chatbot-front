import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '@model/media.model';
import { MediaService } from '@core/services/media.service';
import { ToastrService } from 'ngx-toastr';
import { PaginationHelper } from '@model/pagination-helper.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from '@core/utils/utils';
import { detailInOutAnimation } from '../../shared/components/chatbot-list-item/chatbot-list-item.animation';
import { ConfigService } from '@core/services/config.service';
import { Config } from '@model/config.model';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
  animations: [
    detailInOutAnimation
  ]
})
export class MediaListComponent implements OnInit {

  medias$: Observable<Media[]>;
  pagination: PaginationHelper;
  loading$: Observable<boolean>;
  processing$: Observable<boolean>;
  config$: Observable<Config>;
  unescape = unescape;
  mediaReplace: number;
  mediaLink: number;
  utils = Utils;

  constructor(public mediaService: MediaService,
              @Inject(Window) private _window: Window,
              private _toast: ToastrService,
              private _dialog: MatDialog,
              private _configService: ConfigService) {
  }

  ngOnInit(): void {
    this.loading$ = this.mediaService.loading$;
    this.processing$ = this.mediaService.processing$;
    this.medias$ = this.mediaService.entities$;
    this.pagination = this.mediaService.pagination;
    this.config$ = this._configService.config$;
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
    const files: File[] = $event.target.files;
    if (!files || files.length < 1) {
      return;
    }
    Array.prototype.forEach.call(files, file => {
      const filesize = (file.size / 1024 / 1024);
      if (filesize > 5) {
        this._toast.error('Les poids des fichiers doivent être inférieur à 5Mb.', 'Fichier volumineux');
        return;
      }
    });
    this.mediaService.createMedia(files).subscribe(() => {
      this._toast.success('Votre fichier a bien été enregistré.', 'Téléchargement réussi');
    });
    $event.target.value = '';
  }

  replaceMedia(mediaId: number, file: File) {
    this.mediaService.replace(mediaId, file).subscribe(() => {
      this.mediaReplace = null;
    });
  }

  export() {
    this.mediaService.export().subscribe();
  }

  getMediaPath(media: Media) {
    return `${this.mediaPath}${encodeURI(media.file)}`;
  }

  get mediaPath() {
    return `${this._window.location.origin}/media/`;
  }
}
