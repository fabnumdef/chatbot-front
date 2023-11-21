import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Media } from '@model/media.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-media-edit',
  templateUrl: './media-edit.component.html',
  styleUrls: ['./media-edit.component.scss']
})
export class MediaEditComponent implements OnInit {

  @Input() media: Media;

  mediaForm: FormGroup;

  @Output() newMediaName: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.media);
    this._initForm();
  }

  editMedia() {
    if (!this.mediaForm.valid) {
      return;
    }
    this.newMediaName.emit(this.mediaForm.getRawValue());
  }

  onCancel() {
    this.newMediaName.emit();
  }

  get controls() {
    return this.mediaForm.controls;
  }

  private _initForm() {
    this.mediaForm = this._fb.group({
      file: [this.media.file, [Validators.required, Validators.maxLength(255)]],
    });
  }

}
