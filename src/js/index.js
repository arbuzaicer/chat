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

/*Sorting users for status parameter*/

function sorting(a, b) {

    if(a["status"] > b["status"]) {

        return 1;
    } else {

        return -1;
    }

}

    /*Authentication object*/

var authentication = {
        getMyId: function () {
            let users = new XMLHttpRequest();
            users.open("GET", "https://studentschat.herokuapp.com/users/", false);
            users.send(null);
            let usersArray = JSON.parse(users.responseText);

            for (let i = 0; i < usersArray.length; i++) {

                if (usersArray[i].username == name1.value) {

                    return usersArray[i].user_id;
                }

            }
        },
        getUsersName: function () {

            let users = new XMLHttpRequest();
            users.open("GET", "https://studentschat.herokuapp.com/users/", false);
            users.send(null);
            let usersArray = JSON.parse(users.responseText);
            let userUsernames = [];

            for (let i = 0; i < usersArray.length; i++) {
                userUsernames[i] = usersArray[i].username;
            }

            return userUsernames;
        },
        GetUsersArray: function () {

            let users_array = new XMLHttpRequest();
            users_array.open("GET", "https://studentschat.herokuapp.com/users/", false);
            users_array.send(null);

            return users_array.responseText;
        },
        getMessages: function () {

            let messages_Array = new XMLHttpRequest();
            messages_Array.open("GET", "https://studentschat.herokuapp.com/messages", false);
            messages_Array.send(null);

            return messages_Array.responseText;
        },
        getUsersId: function () {

            let users = new XMLHttpRequest();
            users.open("GET", "https://studentschat.herokuapp.com/users/", false);
            users.send(null);
            let usersArray = JSON.parse(users.responseText);
            let userID = [];

            for (let i = 0; i < usersArray.length; i++) {
                userID[i] = usersArray[i].user_id;
            }

            return userID;
        }
    };
var usersArray = JSON.parse(authentication.GetUsersArray());
var sortStatusUsers = usersArray.sort(sorting);
var messagesArray = JSON.parse(authentication.getMessages());
var fullUsersArray = authentication.getUsersName();


var messages = {
    gettingMsg:   function () {
        var total_msg, user_info, dialog, msgData, textInfo, userFirstName,  msgDateHour, msgMinutes, msgTime, currentTime;
        var msgDate = new Date();

        for(let i = 0; i < messagesArray.length; i++){

            total_msg = document.createElement("div");
            total_msg.className = "total_msg";
            user_info = document.createElement("div");
            user_info.className = "user_info msgs";
            dialog = document.createElement("div");
            dialog.className = "dialog msgs";

            let linkImage = document.createElement("IMG");

            if(messagesArray[i].user_id == authentication.getMyId()) {
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

                if(messagesArray[i].user_id == usersArray[j].user_id) {
                    userFirstName = usersArray[j].username;
                }

            }

            userName.innerHTML = userFirstName;
            msgTime = document.createElement("span");
            msgTime.className = "msg_time";
            msgDate = new Date(messagesArray[i].datetime);
            msgDateHour = msgDate.getHours();
            msgMinutes = msgDate.getMinutes();
            let curDate = msgDate.getDate();
            currentTime = msgDateHour+" : "+msgMinutes;
            msgTime.innerHTML = currentTime;
            msgData = document.createElement("p");
            textInfo = messagesArray[i].message;

            if(msgDate.getDate()=== curDate) {
                msgData.appendChild(msgTime);
                msgData.innerHTML = textInfo;
                user_info.appendChild(linkImage);
                user_info.appendChild(userName);
                dialog.appendChild(msgData);
                msgData.appendChild(msgTime);
                chatRoom.innerHTML = messagesArray[i].chatroom_id;

                if(messagesArray[i].user_id == authentication.getMyId()) {
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

        }

        /*Scrolling our message box to bottom*/

        usersMsg.scrollTo(0, 10000);
    },
    sendingMsg: function() {
    var msgDate = new Date();
    var messagesNewArray = JSON.parse(authentication.getMessages());
    let currentMessagesLength = messagesNewArray.length;
    var total_msg, user_info, dialog, msgData, textInfo, userFirstName,  msgDateHour, msgMinutes, msgTime, currentTime,
        currentDate;

    if(defaultMessagesLength!==currentMessagesLength) {

        for(let i = defaultMessagesLength; i <currentMessagesLength; i++){
            currentDate = document.createElement("div");
            currentDate.className="dataMessages";
            total_msg = document.createElement("div");
            total_msg.className = "total_msg";
            user_info = document.createElement("div");
            user_info.className = "user_info msgs";
            dialog = document.createElement("div");
            dialog.className = "dialog msgs";
            let linkImage = document.createElement("IMG");

            if(messagesNewArray[i].user_id == authentication.getMyId()) {
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

                if(messagesNewArray[i].user_id == usersArray[j].user_id) {
                    userFirstName = usersArray[j].username;
                }

            }

            userName.innerHTML =(userFirstName);

            msgTime = document.createElement("span");
            msgTime.className = "msg_time";

            msgDate = new Date(messagesNewArray[i].datetime);
            msgDateHour = msgDate.getHours();
            msgMinutes = msgDate.getMinutes();
            let curDate = msgDate.getDate();

            currentTime = msgDateHour+" : "+msgMinutes;
            msgTime.innerHTML = currentTime;


            msgData = document.createElement("p");
            textInfo = messagesNewArray[i].message;

            if(msgDate.getDate()===curDate) {
                msgData.appendChild(msgTime);
                msgData.innerHTML = textInfo;

                user_info.appendChild(linkImage);
                user_info.appendChild(userName);
                dialog.appendChild(msgData);
                msgData.appendChild(msgTime);

                chatRoom.innerHTML = messagesNewArray[i].chatroom_id;

                if(messagesNewArray[i].user_id == authentication.getMyId()) {
                    msgData.className = "your_text";
                    total_msg.appendChild(dialog);
                    total_msg.appendChild(user_info);
                    currentDate.appendChild(total_msg);
                    usersMsg.appendChild(currentDate);
                } else {
                    msgData.className = "friend_text";
                    total_msg.appendChild(user_info);
                    total_msg.appendChild(dialog);
                    currentDate.appendChild(total_msg);
                    usersMsg.appendChild(currentDate);
                }
            }

        }

        usersMsg.scrollTo(0, 10000);
    };

    defaultMessagesLength=currentMessagesLength;

}
};


/*Setting user Information*/

function setUserInfo() {
    let name = name1.value;
    let setName = document.querySelector('#userName');
    setName.innerHTML = name;
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
        username: name1.value.toString()
    }));

};

/*Signing User into the Chat. If User is in user_list - continue. If not - need to register.*/

signButton.onclick = function () {

    if(fullUsersArray.includes(name1.value)) {
        alert("Hello "+name1.value);
        bodyChat.style.display = "block";
        modalOut.style.display = "none";

        setUserInfo();

    } else {

        alert("There is no USER with name: "+name1.value+" .Please Enter Your name and Click REGISTER button.");

    }

    function creatingDomUsers() {
        let request = new XMLHttpRequest();

        request.open('GET', 'https://studentschat.herokuapp.com/users', true);

        request.onload = function() {

            if (request.status >= 200 && request.status < 400) {

                /*Creating authentication form.*/


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
                    if(sortStatusUsers[i].username==name1.value) {
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

                    /*Opening user in new window onclick function section*/

                    linkUser.onclick = function() {
                        let usersLength = document.querySelector(".users_length");
                        let newDialog = document.createElement("li");
                        newDialog.className = "nav-item";
                        let newLinkInChat = document.createElement("a");
                        newLinkInChat.className = "nav-link msg_users";
                        newLinkInChat.href = '#'+sortStatusUsers[i].username;
                        newLinkInChat.innerHTML = sortStatusUsers[i].username;
                        let close = document.createElement("span");
                        close.className = "close";
                        close.onclick = function() {
                            this.parentNode.parentNode.removeChild(this.parentNode);
                            return false;
                        };
                        close.innerHTML = "&times";

                        newDialog.appendChild(close);
                        newDialog.appendChild(newLinkInChat);
                        usersLength.appendChild(newDialog);

                        $(document).ready(function(){
                            $(".nav-tabs a").click(function(){
                                $(this).tab('show');
                            });
                        });
                    };

                    /*End Opening user section*/

                    /*Creating a user Status block*/

                    let userStatus = document.createElement("p");
                    let statusName = document.createTextNode(sortStatusUsers[i].status);

                    if(sortStatusUsers[i].status=="active") {
                        userStatus.className = "online_in_chat chat_status";
                        userStatus.appendChild(statusName);
                        currentUser.appendChild(userStatus);
                    }

                    if(sortStatusUsers[i].status=="inactive") {
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
    };
    creatingDomUsers();
    messages.gettingMsg();
};

/*LogOut form*/

signOutButton.onchange = function () {
    bodyChat.style.display = "none";
    modalOut.style.display = "block";
};

/*Sending message*/

sendMessage.onclick = function () {
    var msgDate = new Date();
    var msgSend = new XMLHttpRequest();
    msgSend.open('POST', 'https://studentschat.herokuapp.com/messages', true);

    msgSend.onload = function() {
        // Обработчик ответа в случае удачного соеденения
    };

    msgSend.onerror = function() {
        // Обработчик ответа в случае неудачного соеденения
    };
    msgSend.setRequestHeader('Content-Type', 'application/json');

    if(msgText.value.length!==0) {
        msgSend.send(JSON.stringify({
            user_id: authentication.getMyId(),
            message: msgText.value,
            datetime: msgDate
        }));
    } else {
        alert("You can;t send empty message")
    }

    msgText.value = "";
};

/*Checking new messages*/

var defaultMessagesLength=messagesArray.length;

setInterval(messages.sendingMsg,3000);

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


(function setTimeOnTheSite() {

    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
}());

var fonts = {
    bold: document.querySelector("#bold"),
    italic: document.querySelector("#italic"),
    underline: document.querySelector("#underline")
};
fonts.bold.onclick = function () {
    msgText.value += '<strong></strong>';
};
fonts.italic.onclick = function () {
    msgText.value += '<i></i>';
};
fonts.underline.onclick = function () {
    msgText.value += '<u></u>';
};