Object.defineProperty(exports, '__esModule', { value: true });
const Fs = require('fs-extra');
const Path = require('path');
const detector_1 = require('./detector');

const DefaultLine = {
  total: 0,
  code: 0,
  comment: 0,
};
const DefaultFileInfo = {
  name: '',
  lang: '',
  size: 0,
  lines: DefaultLine,
};

/**
 * 这里是个测试
 * 测试一下多行
 */
class LangFile {
  constructor(filePath) {
    if (!Fs.existsSync(filePath)) {
      throw new Error('Error in File: file now exits.');
    }
    this.path = filePath;
    this.data = this.getFileInfo();
  }

  // this is a test
  static getType(path) {
    const fileExtension = `.${path.split('.').pop()}`; // 测试一下行尾
    if (!Object.keys(detector_1.Detector.extensionMap).length) {
      const detector = new detector_1.Detector();
    }
    return detector_1.Detector.extensionMap[fileExtension] || '';
  }

  filterData(data) {
    const lines = data.split(/\n/);
    const lineData = Object.assign({}, DefaultLine, {
      total: lines.length,
      code: lines.length,
    });
    lines.map((line) => {
      if (!line) {
        lineData.code--;
      }
    });
    return lineData;
  }

  getFileInfo() {
    const info = Object.assign({}, DefaultFileInfo);
    const name = this.path.split(Path.sep).pop() || '';
    let stat;
    let data;
    let lines;
    try {
      stat = Fs.statSync(this.path);
      data = Fs.readFileSync(this.path, 'utf-8');
    } catch (err) {
      throw new Error('read file failed.');
    }
    lines = data.split(/\n/);
    info.name = name;
    info.size = (stat && stat.size) || 0;
    info.lang = LangFile.getType(this.path);
    info.lines = this.filterData(data);
    return info;
  }

  getPath() {
    return this.path;
  }

  getInfo() {
    return this.data;
  }
}
exports.LangFile = LangFile;
