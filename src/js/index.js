import 'babel-polyfill';
import _ from 'lodash';

import './../sass/styles.scss';

/*Modal*/

var modalOut = document.querySelector(".modal_window");
var bodyChat = document.querySelector(".main_boby_chat");
var signButton = document.querySelector("#sign_in");
var signOutButton = document.querySelector("#signOut");
var name1 = document.querySelector("#userName_1");
var register = document.querySelector("#register_button");
var totalUsers = document.querySelector("#total_users");
var usersInform = document.querySelector(".users_contacts_section");
var paricipantName = document.querySelector(".name_user");
var chatStatus = document.querySelector(".chat_status");
var usersMsg = document.querySelector("#chat2");
var sendMessage = document.querySelector(".send_message");
var msgText = document.querySelector("#message_section");

    /*Register new User in Chat. It must be entered correct user_name*/

register.onclick = function() {
    let request = new XMLHttpRequest();
    request.open('POST', 'https://studentschat.herokuapp.com/users/register', true);

    request.onload = function() {
        // Обработчик ответа в случае удачного соеденения
    };

    request.onerror = function() {
        // Обработчик ответа в случае неудачного соеденения
    };

    request.setRequestHeader('Content-Type', 'application/json');

    request.send(JSON.stringify({username: name1.value}));
};

/*Signing User into the Chat. If User is in user_list - continue. If not - need to register.*/

signButton.onclick = function () {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://studentschat.herokuapp.com/users', true);

    request.onload = function() {

        if (request.status >= 200 && request.status < 400) {
            // Обработчик успещного ответа
            var response = request.responseText;
            var userList = JSON.parse(response);

            /*Creating authentication form.*/

            for(let i = 0; i < userList.length; i++) {

                if(name1.value === userList[i].username) {
                    alert("Hello "+name1.value);
                    bodyChat.style.display = "block";
                    modalOut.style.display = "none";

                    (function setUserInfo() {
                        let name = name1.value;
                        let setName = document.querySelector('#userName');
                        setName.innerHTML = name;
                    }());

                }

                /*Creating users using DOM*/

                /*Creating a participants block*/

                let currentUser = document.createElement("div");
                usersInform.appendChild(currentUser);

                if(i%2===0) {
                    currentUser.className = "participants partodd";
                }

                if(i%2!==0) {
                    currentUser.className = "participants parteven";
                }

                /*Creating a user Image*/

                let linkImage = document.createElement("IMG");
                linkImage.className = "chat_users";
                linkImage.setAttribute("src", "http://clipart-library.com/images/dc45n8yzi.png");
                linkImage.setAttribute("alt", "Man_user"+i);
                currentUser.appendChild(linkImage);

                /*Creating a link with user Name block*/

                let linkUser = document.createElement("a");
                let userName = document.createTextNode(userList[i].username);
                linkUser.className = "users_names";
                linkUser.title = userList[i].username;
                linkUser.href = "#";
                linkUser.appendChild(userName);
                currentUser.appendChild(linkUser);

                /*Creating a user Status block*/

                let userStatus = document.createElement("p");
                let statusName = document.createTextNode(userList[i].status);
                userStatus.className = "online_in_chat chat_status";
                userStatus.appendChild(statusName);
                currentUser.appendChild(userStatus);

            }

            /*End cycle*/

            totalUsers.innerHTML = userList.length;

        } else {
            // Обработчик ответа в случае ошибки
        }
    };

    request.onerror = function() {
        alert("network is unstable. Please check your internet connection.")
    };

    request.send();
};

/*LogOut form*/

signOutButton.onclick = function () {
    bodyChat.style.display = "none";
    modalOut.style.display = "block";
};

/*Getting total messages from database*/

var totalMsg = new XMLHttpRequest();

totalMsg.open('GET', 'https://studentschat.herokuapp.com/messages', true);

totalMsg.send();

totalMsg.onreadystatechange = function() {
    if (this.readyState != 4) return;

    // по окончании запроса доступны:
    // status, statusText
    // responseText, responseXML (при content-type: text/xml)

    if (this.status != 200) {
        // обработать ошибку
        alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
        return;
    }

    var getMessages = totalMsg.responseText;
    var messagesData = JSON.parse(getMessages);

    for(let i = 0; i < messagesData.length; i++){
        var msgData = document.createElement("p");
        let textInfo = document.createTextNode(messagesData[i].message);
        msgData.appendChild(textInfo);
        usersMsg.appendChild(msgData);
    }

};

/*Sending message*/

sendMessage.onclick = function() {
    var message = msgText.value;
    document.getElementById("test").innerText = message;
    /*This code is not working yet*/

/*    var sendMsg =  new XMLHttpRequest();

     sendMsg.open('POST', 'https://studentschat.herokuapp.com', true);

     sendMsg.onload = function() {
         // Обработчик ответа в случае удачного соеденения
     };

     sendMsg.onerror = function() {
         // Обработчик ответа в случае неудачного соеденения
     };
     sendMsg.setRequestHeader('Content-Type', 'application/json');
     sendMsg.send(JSON.stringify({message: msgText.value}));*/
};


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


