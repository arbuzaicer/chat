import 'babel-polyfill';
import _ from 'lodash';

import './../sass/styles.scss';

const o = {
  foo: {
    bar: null
  }
};

(function setDate() {
  let date = new Date();
  let dateImport = document.querySelector('.current_date');
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  let currentSeconds = date.getSeconds();
  dateImport.innerHTML = currentHour+':ч '+currentMinutes+':м '+currentSeconds+':с';
}());

console.log(o?.foo?.bar?.baz ?? 'default');
