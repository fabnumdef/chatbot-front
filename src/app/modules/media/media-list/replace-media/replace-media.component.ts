import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '@core/utils/utils';

@Component({
  selector: 'app-replace-media',
  templateUrl: './replace-media.component.html',
  styleUrls: ['./replace-media.component.scss']
})
export class ReplaceMediaComponent implements OnInit {

  @Output() replaceMedia: EventEmitter<File> = new EventEmitter<File>();

  public replaceFile: File;
  public utils = Utils;
  imgPreview = null;

  constructor(private _toast: ToastrService) {
  }

  ngOnInit(): void {
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
    $event.target.value = '';

    if (!Utils.isFileImage(file.name)) {
      this.replaceFile = file;
      this.imgPreview = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.replaceFile = file;
      this.imgPreview = reader.result;
    };
  }

  onReplaceMedia() {
    this.replaceMedia.emit(this.replaceFile);
  }

}
