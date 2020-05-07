import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Media } from '@model/media.model';
import { ResponseType } from '@enum/response-type.enum';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-file-form',
  templateUrl: './image-file-form.component.html',
  styleUrls: ['./image-file-form.component.scss']
})
export class ImageFileFormComponent implements OnInit {

  @Input() responseFormControl: FormControl;
  @Input() responseType: ResponseType;

  url: string = null;
  media: Media = null;

  constructor(@Inject(Window) private _window: Window,
              private _sanitizer: DomSanitizer,
              private _http: HttpClient) {
  }

  ngOnInit(): void {
    this._initResponse();
  }

  get mediaPath() {
    return `${this._window.location.origin}/media/`;
  }

  get isImage() {
    return this.responseType === ResponseType.image;
  }

  getInputLabel() {
    if (this.isImage) {
      return 'Insérer un lien vers une image extérieure';
    }
    return 'Insérer un lien vers un site extérieur ou un fichier';
  }

  getMediaLabel() {
    if (this.isImage) {
      return 'Téléchargez une image de la médiathèque';
    }
    return 'Téléchargez un fichier de la médiathèque';
  }

  urlChange($event) {
    this.url = $event.target.value;
    this.responseFormControl.setValue(this.url);
    this.responseFormControl.markAsDirty();
  }

  mediaChange(media: Media) {
    this.media = media;
    this.responseFormControl.setValue(media ? this.mediaPath + this.media.file : null);
    this.responseFormControl.markAsDirty();
  }

  private _initResponse() {
    const value = this.responseFormControl.value;
    if (!!value && value.includes(this.mediaPath)) {
      this.media = <Media> {
        file: value.replace(this.mediaPath, '')
      };
    } else if (!!value) {
      this.url = value;
    }
  }

}
