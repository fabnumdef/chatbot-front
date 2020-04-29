import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-replace-media',
  templateUrl: './replace-media.component.html',
  styleUrls: ['./replace-media.component.scss']
})
export class ReplaceMediaComponent implements OnInit {

  @Output() replaceMedia: EventEmitter<File> = new EventEmitter<File>();

  public replaceFile: File;

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
    this.replaceFile = file;
    $event.target.value = '';
  }

  onReplaceMedia() {
    this.replaceMedia.emit(this.replaceFile);
  }

}
