import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../../../core/services/file.service';
import { FileTemplateCheckResume } from '../../../core/models/file-template-check-resume.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-intent-file',
  templateUrl: './intent-file.component.html',
  styleUrls: ['./intent-file.component.scss']
})
export class IntentFileComponent implements OnInit {

  importFileFormGroup: FormGroup;
  fileTemplateCheckResume: FileTemplateCheckResume;

  constructor(private _fb: FormBuilder,
              public fileService: FileService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  get fileCtrl(): FormControl {
    return <FormControl> this.importFileFormGroup.get('file');
  }

  checkFile($event) {
    const file = $event.target.files[0];
    if (!file) {
      return;
    }
    this.fileTemplateCheckResume = null;
    this.fileCtrl.setValue(file);
    this.fileCtrl.disable();
    this._checkFile(file);
    $event.target.value = '';
  }

  uploadFile() {
    if (!this.importFileFormGroup.valid) {
      return;
    }
    this.fileService.upload(this.importFileFormGroup.getRawValue()).subscribe();
  }

  exportFile() {
    this.fileService.export().subscribe(res => {
      const blob = new Blob([res], {
        type: 'application/vnd.ms-excel'
      });

      saveAs(blob, `BASE_CONNAISSANCE.xlsx`);
    });
  }

  /**
   * PRIVATE FUNCTIONS
   */

  private initForm() {
    this.importFileFormGroup = this._fb.group({
      file: ['', Validators.required],
      deleteIntents: [false, Validators.required],
    });
  }

  private _checkFile(file: File) {
    this.fileService.checkFile(file).subscribe((response: FileTemplateCheckResume) => {
      this.fileTemplateCheckResume = response;
    }, error => {
      this._resetFile();
    });
  }

  private _resetFile() {
    this.fileTemplateCheckResume = null;
    this.fileCtrl.setValue(null);
  }

}
