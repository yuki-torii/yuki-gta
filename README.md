# yuki-gta
⛩ yuki-gta

[![Travis](https://img.shields.io/travis/yuki-torii/yuki-gta.svg?style=flat-square)](https://travis-ci.org/yuki-torii/yyuki-git-commit)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/limichange/yuki-git-commit/master/LICENSE)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

## Install
```bash
$ npm i --save yuki-gta
# or
$ yarn add yuki-gta
```

## Usage
```js
import Gta from 'yuki-gta'

const gta = new Gta({
  google: 'UA-********-**',
  baidu: '*********'
})

gta.event({
  page: 'page',
  action: 'action',
  label: 'label',
  value: 1
})

gta.pageview('page')
```

## Development
```bash
# install dependencies
$ npm i
# or
$ yarn

# dev
$ npm run dev

# test
$ npm run test

# lint
$ npm run lint
```

## Contributing
 - Fork it!
 - Create your feature branch: git checkout -b my-new-feature
 - Commit your changes: git commit -am 'Add some feature'
 - Push to the branch: git push origin my-new-feature
 - Submit a pull request 🍻

## Author
yuki-gta © [Limichange](https://github.com/limichange), Released under the [MIT](https://opensource.org/licenses/MIT) License.
