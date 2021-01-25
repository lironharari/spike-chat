document.querySelector("#chat-form").onsubmit = (e) => {
  e.preventDefault();
  sendMessage();
};

const showChat = () => {
  let main = document.querySelector("main");
  main.style.display = "block";
};

const populateHeader = () => {
    let header = document.querySelector("header");
    let avatar = document.createElement("div");
    avatar.style.backgroundImage = backgroundImageHeader(avatarImage);
    avatar.classList.add("avatar-header");
    header.append(avatar);
 
    let span = document.createElement("span");
    span.classList.add("welcome-message");
    span.textContent = welcomeMessage(userName);
    header.append(span);
};

const generateMessage = (type,text) => ({
    type: type,
    text: text,
    id:   userID,
    name: userName,
    avatar: avatarImage,
    date: getDate()
  });

const chatMessage = (data) => {
    let chatContainer = document.querySelector(".chat-container");
    
    let post = document.createElement("div");
    post.classList.add("post");
    
    let avatarContainer = document.createElement("div");
    avatarContainer.classList.add("avatar-container");

    let avatar = document.createElement("div");
    avatar.style.backgroundImage = backgroundImageMessage(data);
    avatar.classList.add("avatar");
    
    avatarContainer.append(avatar);
    post.append(avatarContainer);

    let messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    let message = document.createElement("div");
    message.textContent = data.text;
    message.classList.add("message");

    let messageTime = document.createElement("div");
    messageTime.classList.add("message-time");
    messageTime.textContent = data.date;

    messageContainer.append(message);
    messageContainer.append(messageTime);

    post.append(messageContainer);

    chatContainer.append(post);
    chatContainer.scrollTop = chatContainer.scrollHeight;
};

const userEntery = (isEntry,data) => {
    (isEntry ? addUser(data) : removeUser(data));
    appendEntryMessage(isEntry,data);
};

const addUser = (data) => {
    let listItems = document.querySelectorAll(".users-list ul li");
    if(listItems.length){
      data.users.forEach( (user) => {
        if(user.id === data.id){
          appendActiveUser(user);
        }          
      });
    }
    else{
      populateUserList(data.users);
    }      
};

const removeUser = (data) => {
    let listItems = document.querySelectorAll(".users-list ul li");
    listItems.forEach( (listItem) => {
      if(listItem.getAttribute("id") == data.id){
        listItem.remove();
      }        
    });
};

const populateUserList = (users) => {
    users.forEach( (user) => {
      appendActiveUser(user);
    });
};

const appendActiveUser = (user) => {
    let unorderedList = document.querySelector(".users-list ul");
    let listItem = document.createElement("li");
    listItem.setAttribute("id", user.id);

    let avatar = document.createElement("div");
    avatar.classList.add("users-list-avatar");
    avatar.style.backgroundImage = backgroundImageActiveUser(user);

    let userInfo = document.createElement("div");
    userInfo.classList.add("users-list-info");

    let span = document.createElement("span");
    span.textContent = ellipsify(user.name);

    let paragraph = document.createElement("p");
    paragraph.textContent = activeUserMessage(user);

    userInfo.append(span);
    userInfo.append(paragraph);

    listItem.append(avatar);
    listItem.append(userInfo);

    unorderedList.append(listItem);
};

const appendEntryMessage = (isEntry,data) => {
    let chatContainer = document.querySelector(".chat-container");

    let post = document.createElement("div");
    post.classList.add("post");

    let messageContainer = document.createElement("div");
    messageContainer.classList.add("entry-container");

    let message = document.createElement("div");
    message.textContent = entryMessage(data, isEntry);
    message.classList.add("user-entry");

    let messageTime = document.createElement("div");
    messageTime.classList.add("entry-time");
    messageTime.textContent = data.date;

    messageContainer.append(message);
    messageContainer.append(messageTime);

    post.append(messageContainer);

    chatContainer.append(post);
    chatContainer.scrollTop = chatContainer.scrollHeight;
};

const initChat = () => {
    userID = generateID();
    ws = new WebSocket(getHost());

    window.addEventListener("beforeunload", () => {
          ws.send(JSON.stringify(generateMessage("onclose","")));
    });

    ws.onerror = function(error) {
        console.log(chatError(error));
    };

    ws.onopen = () => {
        ws.send(JSON.stringify(generateMessage("onopen","")));
    };

    ws.onmessage = (event) => {
      let data = JSON.parse(event.data);

      switch (data.type) {
        case "onopen":
          userEntery(true,data);
          break;
        case "chat-message":
          chatMessage(data);
          break;
        case "onclose":
          userEntery(false,data);
          break;
        default:
          console.log(messageTypeError);
      }
    };
};

const sendMessage = () => {
    let messageInput = document.querySelector("#message");
    if(messageInput.value.length){
      ws.send(JSON.stringify(generateMessage("chat-message",messageInput.value)));
      messageInput.value = "";
    }
};

const welcomeMessage = (name) => (`Welcome ${name}`);
const backgroundImageHeader = (avatar) => (`url("${avatar}")`);
const backgroundImageMessage = (data) => (`url("${data.avatar}")`);
const backgroundImageActiveUser = (user) => (`url("${user.avatar}")`);
const activeUserMessage = (user) => (`${ellipsify(user.name)} is online`);
const entryMessage = (data, isEntry) => (`${data.name} has ${(isEntry? "entered" : "left")} the chat.`);
const chatError = (error) => (`[error] ${error.message}`);  