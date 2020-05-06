import { FormGroup } from '@angular/forms';

export class Utils {
  static isFileImage(fileName: string) {
    const ext = Utils.getMediaExtension(fileName);
    return ['JPG', 'JPEG', 'GIF', 'PNG'].includes(ext);
  }

  static getMediaExtension(fileName) {
    const regex = /(?:\.([^.]+))?$/;
    return regex.exec(fileName)[1]?.toUpperCase();
  }

  static getDirtyValues(formGroup: FormGroup): any {
    const dirtyFormValues = {};
    formGroup['_forEachChild']((control, name) => {
      if (control.dirty) {
        dirtyFormValues[name] = control.value;
      }
    });
    return dirtyFormValues;
  }
}
