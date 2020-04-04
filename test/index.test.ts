/**
 *
 */
import * as path from 'path';
import slash from 'slash2';

import loc from '../src';
import { Languages } from '../src/languages';

describe('Languages', () => {
  beforeAll(() => {});
  describe('.getExtensionMap', () => {
    it('should return equals', () => {
      const map = new Languages().getExtensionMap();
      expect(map['.js']).toEqual('javascript');
      expect(map['.jsx']).toEqual('javascript');
      expect(map['.ts']).toEqual('typescript');
      expect(map['.tsx']).toEqual('typescript');
      expect(map['.cpp']).toEqual('c++');
      expect(map['.md']).toEqual('markdown');
      expect(map['.json']).toEqual('json');
      expect(map['.yml']).toEqual('yaml');
      expect(map['.svg']).toEqual('svg');
    });
  });
});

describe('LocFile', () => {
  it('js info', () => {
    const jsPath = slash(path.join(__dirname, '/data/index.js'));
    const file = loc(jsPath);
    expect(file.files[0]).toEqual(jsPath);
    const { info, languages } = file;
    expect(Object.keys(languages).pop()).toEqual('javascript');
    expect(info.total).toEqual(83);
    expect(info.code).toEqual(69);
    expect(info.comment).toEqual(6);
  });

  it('ts info', () => {
    const tsPath = slash(path.join(__dirname, '/data/index.ts'));
    const file = loc(tsPath);
    const { info, languages } = file;
    expect(Object.keys(languages).pop()).toEqual('typescript');
    expect(info.total).toEqual(169);
    expect(info.code).toEqual(98);
    expect(info.comment).toEqual(50);
  });

  it('dir info', () => {
    const tsPath = slash(path.join(__dirname, './'));
    const file = loc(tsPath);
    const { info, languages } = file;
    expect(Object.keys(languages).join()).toEqual('javascript,markdown,typescript');
    expect(info).toMatchSnapshot();
    expect(languages).toMatchSnapshot();
  });

  it('dir info', () => {
    const tsPath = slash(path.join(__dirname, '../example'));
    const file = loc(tsPath);
    const { info, languages } = file;
    expect(Object.keys(languages).join()).toEqual(
      'typescript,javascript,json,,svg,markdown,less,ejs',
    );
    expect(info).toMatchSnapshot();
    expect(languages).toMatchSnapshot();
  });
});
