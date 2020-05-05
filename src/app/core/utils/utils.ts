import { Media } from '@model/media.model';

export class Utils {
  static isFileImage(fileName: string) {
    const ext = Utils.getMediaExtension(fileName);
    return ['JPG', 'JPEG', 'GIF', 'PNG'].includes(ext);
  }

  static getMediaExtension(fileName) {
    const regex = /(?:\.([^.]+))?$/;
    return regex.exec(fileName)[1]?.toUpperCase();
  }
}
