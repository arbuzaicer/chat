import 'babel-polyfill';
import _ from 'lodash';

import './../sass/styles.scss';

/*Modal*/

var modalOut = document.querySelector(".modal_window");
var bodyChat = document.querySelector('.main_boby_chat');
var signButton = document.querySelector("#sign_in");
var signOutButton = document.querySelector("#signOut");

signButton.onclick = function () {
    bodyChat.style.display = "block";
    modalOut.style.display = "none";
    var name1 = document.querySelector('#userName_1');

    (function setUserInfo() {
        let name = name1.value;
        let setName = document.querySelector('#userName');
        setName.innerHTML = name;
    }());

};

/*Running main body chat*/

signOutButton.onclick = function () {
    bodyChat.style.display = "none";
    modalOut.style.display = "block";
};

/*Creating chat users*/



/*Setting users information*/


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
