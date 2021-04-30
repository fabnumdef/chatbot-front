import { FormGroup } from '@angular/forms';

export class Utils {
  static isFileImage(fileName: string) {
    const ext = Utils.getMediaExtension(fileName);
    return ['JPG', 'JPEG', 'GIF', 'PNG', 'SVG'].includes(ext);
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

  static uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
