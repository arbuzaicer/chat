import 'babel-polyfill';
import _ from 'lodash';

import './../sass/styles.scss';

/*Setting users information*/
(function setUserInfo() {
    let name = userName;
    let age = userAge;
    let setName = document.querySelector('#userName');
    let setAge = document.querySelector('#userAge');
    setName.innerHTML = name+', ';
    setAge.innerHTML = age;
}());

/*Creating a clock in the header section*/
(function setDate() {
  let date = new Date();
  let currentData = document.querySelector('.currentDate');
  let setHours = document.querySelector('.hour');
  let setMinutes = document.querySelector('.minutes');
  let setSeconds = document.querySelector('.seconds');
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  let currentSeconds = date.getSeconds();
  let currentDate = date.getDate();
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();
  let monthsName = ['January', 'February', 'May', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var monthName;

  for(let i=0; i<monthsName.length; i++){
    monthName=monthsName[currentMonth];
  }
  currentData.innerHTML = currentDate+' / '+monthName;
  setHours.innerHTML = currentHour;
  setMinutes.innerHTML = currentMinutes;
  setSeconds.innerHTML = currentSeconds;
  setTimeout(setDate, 1);
}());
