import 'babel-polyfill';
import _ from 'lodash';

import './../sass/styles.scss';

const o = {
  foo: {
    bar: null
  }
};

console.log(o?.foo?.bar?.baz ?? 'default');
