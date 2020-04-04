[![npm version](https://badge.fury.io/js/%40umijs%2Flinguist.svg)](https://badge.fury.io/js/%40umijs%2Flinguist) ![Node CI](https://github.com/chenshuai2144/linguist/workflows/Node%20CI/badge.svg) [![](https://img.shields.io/npm/dw/@umijs/linguist.svg)](https://www.npmjs.com/package/@umijs/linguist)

# @umijs/linguist

一个查看你代码行数和各种信息的工具，对 js 项目的支持性最好。

## Install

```bash
npm install @umijs/linguist

----
yarn add @umijs/linguist
```

## Usage

你可以在命令行中使用，也可以用 node 来调用。

### Command line mode

支持传入一个文件或者文件夹

#### 扫描一个文件夹

```bash
# loc file <path>
loc src
```

<img width="583" alt="sshot-1" src="https://user-images.githubusercontent.com/8186664/78422305-f110ce00-7690-11ea-845f-24a6c695da06.png">

#### 扫描一个文件

```bash
# loc dir <pattern>
loc /src/index.ts
```

<img width="390" alt="sshot-2" src="https://user-images.githubusercontent.com/8186664/78422303-eb1aed00-7690-11ea-8dd3-7081511a8955.png">

### 在 node 中使用

```javascript
const loc = require('@umijs/linguist');
// 输入文件ji
loc(file | dir);
```

输出文件

```json
 {

  "ejs":  {
    "code": 199,
    "comment": 0,
    "sum": 1,
    "total": 215,
  },
  "javascript":  {
    "code": 45,
    "comment": 28,
    "sum": 2,
    "total": 81,
  },
  "json":  {
    "code": 54,
    "comment": 4,
    "sum": 3,
    "total": 61,
  },
  "less":  {
    "code": 489,
    "comment": 2,
    "sum": 12,
    "total": 558,
  },
  "markdown":  {
    "code": 36,
    "comment": 0,
    "sum": 1,
    "total": 58,
  },
  "svg":  {
    "code": 2,
    "comment": 0,
    "sum": 2,
    "total": 2,
  },
  "typescript":  {
    "code": 4398,
    "comment": 197,
    "sum": 85,
    "total": 4975,
  },
}
`
```

## License

MIT License.
