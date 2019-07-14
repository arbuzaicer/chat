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
var usersMsg3 = document.querySelector("#chat3");
var usersMsg = document.querySelector("#chat2");
var sendMessage = document.querySelector(".send_message");
var msgText = document.querySelector("#message_section");
var usersChatSwitcher = document.querySelector(".msg_users");


var totalSymbols = document.querySelector(".Symbols");
var invis = document.querySelector("#invisible");
var words = document.querySelector("#letters");
var totalSigns = document.querySelector("#signs");

var usersDatas = {
    user_id: null,
    username: null
};

var userObj = [];

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
        username: name1.value,
        password: password1.value
    }));

};

/*Creating usernames/id data to each user*/

var usersInChatTotal = new XMLHttpRequest();
usersInChatTotal.open('GET', 'https://studentschat.herokuapp.com/users', true);

usersInChatTotal.onload = function() {
        // Обработчик успещного ответа
        var gettindUsersData = usersInChatTotal.responseText;
        var userList = JSON.parse(gettindUsersData);

        let a = userList.slice();

        for(let i = 0; i < userList.length; i++) {
            userObj[i]= userList[i].user_id;
        }


        console.log(a);
};
usersInChatTotal.send();

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
            var objUsersCopy = [];
            for(let i = 0; i < userList.length; i++) {
                usersArray[i]=userList[i].username;
            }

            /*Creating authentication form.*/

            if(usersArray.includes(name1.value && password1.value)) {

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

            for(let i = 0; i < userList.length; i++) {

                /*Creating users using DOM*/
                if(userList[i].username===name1.value) {
                    continue;
                };
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

                if(userList[i].status==="active") {
                    userStatus.className = "online_in_chat chat_status";
                    userStatus.appendChild(statusName);
                    currentUser.appendChild(userStatus);
                }
                if(userList[i].status==="inactive") {
                    userStatus.className = "contacts_in_chat chat_status";
                    userStatus.appendChild(statusName);
                    currentUser.appendChild(userStatus);
                }

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
    var msgData, textInfo;
    let arrEmp = [];

    for(let i = 0; i < messagesData.length; i++){
        msgData = document.createElement("p");
        textInfo = messagesData[i].message;
        msgData.innerHTML = textInfo;
        usersMsg.appendChild(msgData);
    }

};

var totalMsg3 = new XMLHttpRequest();

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
    var msgData, textInfo, dialog;
    var arrEmp = [];

    for(let i = 0; i < messagesData.length; i++){
        dialog = document.createElement("div");

        let linkImage = document.createElement("IMG");
        linkImage.setAttribute("src", "http://www.free-icons-download.net/images/administrator-icon-5154.png");
        linkImage.setAttribute("alt", "Man_user3"+i);
        linkImage.className = "chat_users";

        dialog.className = "dialog";

        msgData = document.createElement("p");
        msgData.className = "friend_text";
        textInfo = messagesData[i].message;
        msgData.innerHTML = textInfo;
        msgData.appendChild(linkImage);
        dialog.appendChild(msgData);
        usersMsg3.appendChild(dialog);

        let userName = document.createElement("span");
        userName.className = "name_user";

        for(let i = 0; i < userObj.length; i++) {

        }
    }
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
    
    document.querySelector(".send_message").onclick = function () {
        document.querySelector("#test").innerHTML=msgText.value;
    }

    
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


