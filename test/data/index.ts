/**
 * detect file info
 */

import * as fs from 'fs-extra';
import * as Path from 'path';

const SIMPLE_LINE_REG = /\s{1,}\/\/\s{1,}/g;
const ONLY_COMMENT_SIMPLE_LINE_REG = /\/\//g;
const ONE_LINE_REG = /$(\s{1,})\*.*/g;

export interface LineInfo {
  total: number;
  code: number;
  comment: number;
}

export interface FileInfo {
  name: string;
  lang: string;
  size: number;
  lines: LineInfo;
}

const DefaultLine: LineInfo = {
  total: 0,
  code: 0,
  comment: 0,
};

const DefaultFileInfo: FileInfo = {
  name: '',
  lang: '',
  size: 0,
  lines: DefaultLine,
};

/**
 * collect language info of a file
 *
 * @export
 * @class LocFile
 */
export class LocFile {
  private path: string;

  // @ts-ignore
  private language = new Languages();

  private data: FileInfo;

  /**
   * Creates an instance of LocFile.
   * @param {string} filePath
   * @memberof LocFile
   */
  constructor(filePath: string) {
    if (!fs.existsSync(filePath)) {
      throw new Error('Error in File: file now exits.');
    }

    // this.file = new File();

    this.path = filePath;
    this.data = this.getFileInfo();
  }

  /**
   * get file type through a path
   *
   * @private
   * @param {string} path
   * @returns {string}
   * @memberof LocFile
   */
  getType(path: string): string {
    const fileExtension = `.${path.split('.').pop()}`;
    return this.language.extensionMap[fileExtension] || '';
  }

  public filterData = (data: string): LineInfo => {
    const lines = data.split(/\n/);
    let commentLength = 0;
    let codeLength = lines.length;
    const total = codeLength;

    lines.forEach((line) => {
      // 多行注释
      if (/(\*)|(\*\/)/g.test(line) || ONE_LINE_REG.test(line)) {
        commentLength += 1;
        codeLength -= 1;
      }
      // 单行注释
      if (SIMPLE_LINE_REG.test(line)) {
        commentLength += 1;
        // 只有注释
        if (ONLY_COMMENT_SIMPLE_LINE_REG.test(line)) {
          codeLength -= 1;
        }
      }
      if (!line) {
        codeLength -= 1;
      }
    });

    return {
      ...DefaultLine,
      total,
      code: codeLength,
      comment: commentLength,
    };
  };

  /**
   * get file info when LocFile init
   *
   * @private
   * @returns {FileInfo}
   * @memberof LocFile
   */
  private getFileInfo(data?: string): FileInfo {
    let newData = data;
    const info: FileInfo = Object.assign({}, DefaultFileInfo);
    const name = this.path.split(Path.sep).pop() || '';
    let stat: fs.Stats;
    try {
      stat = fs.statSync(this.path);
      newData = data || fs.readFileSync(this.path, 'utf-8');
    } catch (err) {
      throw new Error('read file failed.');
    }

    info.name = name;
    info.size = (stat && stat.size) || 0;
    info.lang = this.getType(this.path);
    info.lines = this.filterData(newData);

    return info;
  }

  /**
   * return file path
   *
   * @returns {string}
   * @memberof LocFile
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * return file info
   *
   * @returns {FileInfo}
   * @memberof LocFile
   */
  public getInfo(): FileInfo {
    return this.data;
  }

  public getFileInfoByContent(name: string, data: string): FileInfo {
    const info: FileInfo = Object.assign({}, DefaultFileInfo);
    info.name = name;
    info.lang = this.getType(name);
    info.lines = this.filterData(data);
    return info;
  }
}
