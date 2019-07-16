import 'babel-polyfill';
import _ from 'lodash';

import './../sass/styles.scss';

/*Variables list*/

var modalOut = document.querySelector(".modal_window");
var bodyChat = document.querySelector(".main_boby_chat");
var signButton = document.querySelector("#sign_in");
var signOutButton = document.querySelector("#signOut");
var name1 = document.querySelector("#userName_1");
var password1 = document.querySelector("#password");
var register = document.querySelector("#register_button");
var totalUsers = document.querySelector("#total_users");
var usersInform = document.querySelector(".users_contacts_section");
var paricipantName = document.querySelector(".name_user");
var chatStatus = document.querySelector(".chat_status");
var chatRoom = document.querySelector("#chatroom");

var usersMsg = document.querySelector("#chat1");
var sendMessage = document.querySelector(".send_message");
var msgText = document.querySelector("#message_section");
var usersChatSwitcher = document.querySelector(".msg_users");


var totalSymbols = document.querySelector(".Symbols");
var invis = document.querySelector("#invisible");
var words = document.querySelector("#letters");
var totalSigns = document.querySelector("#signs");
var msgDate = new Date();

/*Users array, My Id function*/

    /*Function that create an users array from JSON*/

function GetUsersArray(users_url) {

    let users_array = new XMLHttpRequest();
    users_array.open("GET", users_url, false);
    users_array.send(null);

    return users_array.responseText;
}

var usersArray = JSON.parse(GetUsersArray("https://studentschat.herokuapp.com/users/"));

/*Sorting users for status parameter*/

function sorting(a, b) {
    if(a["status"] > b["status"]) {
        return 1;
    } else {
        return -1;
    }

}

/*Creating a status sorted array*/

var sortStatusUsers = usersArray.sort(sorting);

/*Function that set my ID*/

function getMyId() {

    for(let i = 0; i < usersArray.length; i++) {

        if(usersArray[i].username === name1.value) {
            return usersArray[i].user_id;
        }
    }

}

/*Modal*/

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

    request.send(JSON.stringify({
        username: name1.value
    }));

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
            var usersArray = [];

            for(let i = 0; i < userList.length; i++) {
                usersArray[i]=userList[i].username;
            }

            /*Creating authentication form.*/

            if(usersArray.includes(name1.value)) {
                alert("Hello "+name1.value);
                bodyChat.style.display = "block";
                modalOut.style.display = "none";

                (function setUserInfo() {
                    let name = name1.value;
                    let setName = document.querySelector('#userName');
                    setName.innerHTML = name;
                }());

            } else {

                alert("There is no USER with name: "+name1.value+" .Please Enter Your name and Click REGISTER button.");

            }

            for(let i = 0; i < sortStatusUsers.length; i++) {
                let currentUser = document.createElement("div");
                let linkImage = document.createElement("IMG");
                let linkUser = document.createElement("a");

                if(i%2===0) {
                    currentUser.className = "participants parteven";
                } if(i%2!==0) {
                    currentUser.className = "participants partodd";
                }

                /*Creating users using DOM*/
                if(sortStatusUsers[i].username===name1.value) {
                    continue;
                }
                /*Creating a participants block*/

                usersInform.appendChild(currentUser);

                /*Creating a user Image*/

                let userName = document.createTextNode(sortStatusUsers[i].username);
                linkImage.className = "chat_users";
                linkImage.setAttribute("src", "http://clipart-library.com/images/dc45n8yzi.png");
                linkImage.setAttribute("alt", "Man_user"+i);
                currentUser.appendChild(linkImage);

                /*Creating a link with user Name block*/

                linkUser.className = "users_names";
                linkUser.title = sortStatusUsers[i].username;
                linkUser.href = "#";
                linkUser.appendChild(userName);
                currentUser.appendChild(linkUser);

                /*Creating a user Status block*/

                let userStatus = document.createElement("p");
                let statusName = document.createTextNode(sortStatusUsers[i].status);

                if(sortStatusUsers[i].status==="active") {
                    userStatus.className = "online_in_chat chat_status";
                    userStatus.appendChild(statusName);
                    currentUser.appendChild(userStatus);
                }

                if(sortStatusUsers[i].status==="inactive") {
                    userStatus.className = "contacts_in_chat chat_status";
                    userStatus.appendChild(statusName);
                    currentUser.appendChild(userStatus);
                }

            }

            /*End cycle*/

            totalUsers.innerHTML = sortStatusUsers.length;

        } else {
            // Обработчик ответа в случае ошибки
        }
    };

    request.onerror = function() {

        alert("network is unstable. Please check your internet connection.")

    };

    request.send();

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
        var total_msg, user_info, dialog, msgData, textInfo, userFirstName,  msgDateHour, msgMinutes, msgTime, currentTime,
        currentDate;


        for(let i = 0; i < messagesData.length; i++){
            currentDate = document.createElement("div");
            total_msg = document.createElement("div");
            total_msg.className = "total_msg";
            user_info = document.createElement("div");
            user_info.className = "user_info msgs";
            dialog = document.createElement("div");
            dialog.className = "dialog msgs";
            let linkImage = document.createElement("IMG");

            if(messagesData[i].user_id == getMyId()) {
                linkImage.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:" +
                    "ANd9GcTX1PNJ2ZQWmCvQseFXkP6qx6MRQjbq4Yb45Ig29YdY0faKhi96");
            } else {
                linkImage.setAttribute("src", "http://www.free-icons-download.net/images/administrator-icon-5154.png");
            }

            linkImage.setAttribute("alt", "Man_user3"+i);
            linkImage.className = "chat_users";

            let userName = document.createElement("p");
            userName.className = "name_user";

            for(let j = 0; j < usersArray.length; j++) {

                if(messagesData[i].user_id === usersArray[j].user_id) {
                    userFirstName = usersArray[j].username;
                }

            }

            userName.innerHTML =(userFirstName);

            msgTime = document.createElement("span");
            msgTime.className = "msg_time";

            msgDate = new Date(messagesData[i].datetime);
            msgDateHour = msgDate.getHours();
            msgMinutes = msgDate.getMinutes();
            currentTime = msgDateHour+" : "+msgMinutes;
            msgTime.innerHTML = currentTime;


            msgData = document.createElement("p");
            textInfo = messagesData[i].message;

            msgData.appendChild(msgTime);
            msgData.innerHTML = textInfo;

            user_info.appendChild(linkImage);
            user_info.appendChild(userName);
            dialog.appendChild(msgData);
            msgData.appendChild(msgTime);

            chatRoom.innerHTML = messagesData[i].chatroom_id;

            if(messagesData[i].user_id == getMyId()) {
                msgData.className = "your_text";
                total_msg.appendChild(dialog);
                total_msg.appendChild(user_info);
                usersMsg.appendChild(total_msg);
            } else {
                msgData.className = "friend_text";
                total_msg.appendChild(user_info);
                total_msg.appendChild(dialog);
                usersMsg.appendChild(total_msg);
            }

        }

        /*Scrolling our message box to bottom*/

        usersMsg.scrollTo(0, 1000);

    };

};

/*LogOut form*/

signOutButton.onclick = function () {
    bodyChat.style.display = "none";
    modalOut.style.display = "block";
};

/*Sending message*/

sendMessage.onclick = function () {

    var msgSend = new XMLHttpRequest();
    msgSend.open('POST', 'https://studentschat.herokuapp.com/messages', true);

    msgSend.onload = function() {
        // Обработчик ответа в случае удачного соеденения
    };

    msgSend.onerror = function() {
        // Обработчик ответа в случае неудачного соеденения
    };
    msgSend.setRequestHeader('Content-Type', 'application/json');

    msgSend.send(JSON.stringify({
        user_id: getMyId(),
        message: msgText.value,
        datetime: msgDate
    }));
};

/*Output message parameters: symbols.length, letters,length. invisible_signs.length and
* signs.length*/

(function() {

    msgText.oninput  = function () {

        totalSymbols.innerHTML = msgText.value.length;

        if(msgText.value.length<500) {
            /*Selecting backspaces, signs*/

            (function signsCalc() {

                let digits = msgText.value.replace(/[^_\d]+/g, "╝");
                let newSect = msgText.value.replace(/[^_\W]+/g, "§");
                let signArr = newSect.split("");
                let digArr = digits.split("");
                let finSignArr = [];
                let finDigArray = [];
                let backspaces = [];

                /*Cycle to push backspaces into array*/

                for(let i = 0; i < newSect.length; i++) {

                    if(newSect[i]===" ") {
                        backspaces.push(newSect[i])
                    }

                }

                /*Calculating russian/english letters*/
                if( msgText.value.match(/[a-zA-Zа-яА-Я]/g)) {
                    words.innerHTML=msgText.value.match(/[a-zA-Zа-яА-Я]/g).length;
                } else {
                    words.innerHTML = 0;
                }

                if(msgText.value.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g)) {
                    totalSigns.innerHTML = msgText.value.match(/[.,\/#!$%\^&\*;:{}\[\]=\-_`~()]/g).length;
                } else {
                    totalSigns.innerHTML = 0;
                }

                invis.innerHTML = backspaces.length;

            }());
        } else {
            alert("Message is to long. The max of msg length is: 500 Symbols");
            msgText.value = " ";
        }
    };

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


