import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Media } from '@model/media.model';
import { ResponseType } from '@enum/response-type.enum';

@Component({
  selector: 'app-image-file-form',
  templateUrl: './image-file-form.component.html',
  styleUrls: ['./image-file-form.component.scss']
})
export class ImageFileFormComponent implements OnInit {

  @Input() responseFormControl: FormControl;
  @Input() responseType: ResponseType;

  url: string = null;
  media: Media;

  constructor(@Inject(Window) private _window: Window) {
  }

  ngOnInit(): void {
    this._initResponse();
  }

  get mediaPath() {
    return `${this._window.location.origin}/media/`;
  }

  getInputLabel() {
    if (this.responseType === ResponseType.image) {
      return 'Insérer un lien vers une image extérieure';
    }
    return 'Insérer un lien vers un site extérieur ou un fichier';
  }

  getMediaLabel() {
    if (this.responseType === ResponseType.image) {
      return 'Téléchargez une image de la médiathèque';
    }
    return 'Téléchargez un fichier de la médiathèque';
  }

  urlChange($event) {
    this.url = $event.target.value;
    this.responseFormControl.setValue(this.url);
  }

  mediaChange(media: Media) {
    this.media = media;
    this.responseFormControl.setValue(this.mediaPath + this.media.file);
  }

  private _initResponse() {
    const value = this.responseFormControl.value;
    if (!!value && value.includes(this.mediaPath)) {
      this.media = <Media> {
        file: value
      };
    } else if (!!value) {
      this.url = value;
    }
  }

}
