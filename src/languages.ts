import { ExtensionJustify } from './utils';

// tslint:disable-next-line
const languageMap = require('language-map');
// tslint:disable-next-line
// const lang = require('language-classifier');

interface ExtensionsTypes {
  [key: string]: string;
}

export interface DetectorOptions {}

/**
 * detecte program language through file extension
 *
 * @export
 * @class LanguageDetector
 */
export class Languages {
  extensionMap: {
    [key: string]: string;
  } = {};

  /**
   * Creates an instance of Detector.
   * @param {DetectorOptions} [options]
   * @memberof Detector
   */
  constructor() {
    this.extensionMap = this.loadExtensionMap();
  }

  /**
   * load language before detecting
   *
   * @private
   * @returns
   * @memberof Detector
   */
  private loadExtensionMap = () => {
    const extensions: ExtensionsTypes = {};

    Object.keys(languageMap).forEach((language) => {
      const languageMode = languageMap[language];
      const languageExtensions = (languageMode && languageMode.extensions) || [];
      languageExtensions.forEach((extension: string) => {
        extensions[extension.toLowerCase()] = language.toLowerCase();
      });
    });

    return Object.assign({}, extensions, ExtensionJustify);
  };

  /**
   * return extension map
   *
   * @returns
   * @memberof Detector
   */
  public getExtensionMap() {
    return this.extensionMap;
  }
}
