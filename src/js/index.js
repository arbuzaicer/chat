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
  let dateImport = document.querySelector('.clock_container');
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  let currentSeconds = date.getSeconds();
  let currentDate = date.getDay();
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();

  dateImport.innerHTML = 'Date: '+currentDate+' - '+currentMonth+' - '+currentYear+' '+'time: '+currentHour+':ч '+currentMinutes+':м '+currentSeconds+':с';
  setTimeout(setDate, 1);
}());

