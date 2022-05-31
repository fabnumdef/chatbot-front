import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
  @Input() index: number;

  btnText: string = null;
  url: string = null;
  media: Media = null;

  constructor(@Inject(Window) private _window: Window,
              private _sanitizer: DomSanitizer,
              private _http: HttpClient,
              private _fb: FormBuilder) {
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

  getBadgeLabel(idx: number) {
    if (this.isImage) {
      return 'Image';
    }
    return `Lien / Fichier ${idx ? idx : ''}`;
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

  btnTextChange($event) {
    this.btnText = $event.target.value;
    if (!this.btnText || (!this.url && !this.media)) {
      this.responseFormControl.setValue(null);
      return;
    }
    if (this.url) {
      this.responseFormControl.setValue(`${this.btnText} <${this.url}>`);
    } else if (this.media) {
      this.responseFormControl.setValue(`${this.btnText} <${this.mediaPath + encodeURI(this.media.file)}>`);
    }
    this.responseFormControl.markAsDirty();
  }

  urlChange($event) {
    this.url = $event.target.value;
    if (!this.isImage && (!this.btnText || (!this.url && !this.media))) {
      this.responseFormControl.setValue(null);
      return;
    }
    this.responseFormControl.setValue(`${this.btnText} <${this.url}>`);
    this.responseFormControl.markAsDirty();
  }

  mediaChange(media: Media) {
    this.media = media;
    if (!this.isImage && (!this.btnText || (!this.url && !this.media))) {
      this.responseFormControl.setValue(null);
      return;
    }
    if (this.isImage) {
      this.responseFormControl.setValue(media ? `${this.mediaPath + encodeURI(this.media.file)}` : null);
    } else {
      this.responseFormControl.setValue(media ? `${this.btnText} <${this.mediaPath + encodeURI(this.media.file)}>` : null);
    }
    this.responseFormControl.markAsDirty();
  }

  private _initResponse() {
    const value = this.responseFormControl.value;
    let file;
    if (this.isImage) {
      file = value;
    } else if (!!value) {
      file = value.substring(value.indexOf('<') + 1, value.indexOf('>')).trim();
      this.btnText = value.substring(0, value.indexOf('<')).trim();
    }
    if (!!file && file.includes(this.mediaPath)) {
      this.media = <Media> {
        file: file.replace(this.mediaPath, '')
      };
    } else if (!!file) {
      this.url = file;
    }
  }

}
