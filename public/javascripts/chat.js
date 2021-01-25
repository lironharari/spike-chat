/**
 * Chat functionality 
 */

/**
 * Handle chat form onsubmit event
 * @param {DOM Event} e - input event of form submit
 */ 
document.querySelector("#chat-form").onsubmit = (e) => {
  e.preventDefault(); //prevent default submit event handling
  sendMessage(); // send chat message
};

/**
 * Display chat
 */ 
const showChat = () => {
  let main = document.querySelector("main"); // get the main chat element
  main.style.display = "block"; // change display from hidden to block
};

/**
 * Populate chat header
 */ 
const populateHeader = () => {
    let header = document.querySelector("header"); // get header element
    
    let avatar = document.createElement("div"); // create div element
    avatar.style.backgroundImage = backgroundImageAvatar(userAvatar); // populate background image
    avatar.className = "avatar-header"; // add class
    header.append(avatar); // append avatar element to header

    let span = document.createElement("span"); // create span element
    span.className = "welcome-message"; // add class
    span.textContent = welcomeMessage(userName); // insert text into span element
    header.append(span); // append welcome message to header
};

/**
 * Generte message object to send to server
 * @param {string} type - type of message
 * @param {string} text - actual message text
 * @returns {object} - message object to send to server
 */ 
const generateMessage = (type, text) => ({
    type: type, // type of message
    text: text, // message text
    id:   userID, // client id
    name: userName, // client name
    avatar: userAvatar, // client avatar
    date: getDate() // date stamp of message
  });

/**
 * Append message to chat
 * @param {object} data - message data
 */ 
const appendChatMessage = (data) => {
    let chatContainer = document.querySelector(".chat-container"); // get chat container element
    
    let post = document.createElement("div"); // create div element representing chat post
    post.className = "post"; // add post class
    
    let avatarContainer = document.createElement("div"); // create div element representing avatar container
    avatarContainer.className = "avatar-container"; // add avatar container class

    let avatar = document.createElement("div"); // create div element representing avatar image
    avatar.style.backgroundImage = backgroundImageAvatar(data.avatar); // add avatar background image
    avatar.className = "avatar"; // add avatar image class
    
    avatarContainer.append(avatar); // append avatar image to avatar container
    post.append(avatarContainer); // append avatar container to post element

    let messageContainer = document.createElement("div"); // create div element representing message container
    messageContainer.className = "message-container"; // add message container class

    let message = document.createElement("div"); // create div element representing chat message
    message.textContent = data.text; // add chat message
    message.className = "message"; // add message class

    let messageTime = document.createElement("div"); // create div element representing message timestamp
    messageTime.className = "message-time"; // add message timestamp class
    messageTime.textContent = data.date; // add timestamp info

    messageContainer.append(message); // append message to message container
    messageContainer.append(messageTime); // append message timestamp to message container

    post.append(messageContainer); // append message container to post element

    chatContainer.append(post); // append post element to chat container
    chatContainer.scrollTop = chatContainer.scrollHeight; // scroll to the end to reveal new message
};

/**
 * Handle user entry (enter or exits)
 * @param {boolean} isEntry - a variable indicating if client entered or left the chat  
 */ 
const userEntery = (isEntry,data) => {
    (isEntry ? addUser(data) : removeUser(data.id)); // add or remove user based on isEntry param
    appendEntryMessage(isEntry, data); // add entry message to chat
};

/**
 * Add user to 'active user list'
 * @param {object} data - an object containing the new user data and a list of all active users
 */ 
const addUser = (data) => {
    let listItems = document.querySelectorAll(".users-list ul li"); // get all list items
    if(listItems.length) { // if the list has members add only the new user
      data.users.forEach( (user) => { // iterate over all the active users
        if(user.id === data.id) { // find the new user info
          appendActiveUser(user); // add user to the active list
        }          
      });
    }
    else{ // the list is empty which means that the client is the new user
      populateUserList(data.users); // populate all active users
    }      
};

/**
 * Remove user from 'active user list'
 * @param {number} id - user id to remove
 */ 
const removeUser = (id) => {
    let listItems = document.querySelectorAll(".users-list ul li"); // get all list items
    listItems.forEach( (listItem) => { // loop over all the items
      if(listItem.getAttribute("id") === activeUserId(id)){ // search for a matching id
        listItem.remove(); // remove the list item
      }        
    });
};

/**
 * Add all users to the 'active user list'
 * @param {object} users - array of active users
 */ 
const populateUserList = (users) => {
    users.forEach( (user) => { // loop over all users
      appendActiveUser(user); // add the current user
    });
};

/**
 * Add user to the 'active user list'
 * @param {object} user - object with user data
 */ 
const appendActiveUser = (user) => {
    let unorderedList = document.querySelector(".users-list ul"); // get the ul element representing the active user list
    
    let listItem = document.createElement("li"); // create a list item element
    listItem.setAttribute("id", activeUserId(user.id)); //set unique id

    let avatar = document.createElement("div"); // create div representing avatar
    avatar.className = "users-list-avatar"; // set avatar class
    avatar.style.backgroundImage = backgroundImageAvatar(user.avatar); // set background image

    let userInfo = document.createElement("div"); // create div representing avatar info container
    userInfo.className = "users-list-info"; // set avatar info class

    let span = document.createElement("span"); // create span element representing avatar name
    span.textContent = ellipsify(user.name); // set avatar ellipsified name

    let paragraph = document.createElement("p"); // create p element representing avatar online text
    paragraph.textContent = activeUserMessage(user.name); // set avatar online text

    userInfo.append(span); // append avatar name to avatar info container
    userInfo.append(paragraph); // append avatar online text to avatar info container

    listItem.append(avatar); // append avatar to list item element
    listItem.append(userInfo); // append avatar info to list item element

    unorderedList.append(listItem); // append list item to active users list
};

/**
 * Add entry message to chat
 * @param {boolean} isEntry - does the client enter or exit the chat
 * @param {object} data - entry user data
 */ 
const appendEntryMessage = (isEntry, data) => {
    let chatContainer = document.querySelector(".chat-container"); // get chat element

    let post = document.createElement("div"); // create div element representing a chat post
    post.className = "post"; // set post class

    let messageContainer = document.createElement("div"); // create div element representing entry message container
    messageContainer.className = "entry-container"; // set entry message container class

    let message = document.createElement("div"); // create div element representing entry message
    message.textContent = getEntryMessage(data.name, isEntry); // set message text
    message.className = "user-entry"; // set entry message class

    let messageTime = document.createElement("div"); // create div element representing entry message timestamp
    messageTime.className = "entry-time"; // set entry message timestamp class
    messageTime.textContent = data.date; // set message timestamp

    messageContainer.append(message); // append message to message container
    messageContainer.append(messageTime); // append message timestamp to message container

    post.append(messageContainer); // append message container to post element

    chatContainer.append(post); // append post element to chat container
    chatContainer.scrollTop = chatContainer.scrollHeight; // scroll to the end to reveal new message
};

/**
 * Initiate the WebSocket server
 */ 
const initChat = () => {
    userID = generateID(); // generate unique client id
    ws = new WebSocket(getHost()); // create WebSocket element

    window.addEventListener("beforeunload", () => { // add listener to user exit
          ws.send(JSON.stringify(generateMessage(messageType.CLOSE,""))); // upon exit notify the server
    });

    // handle web socket error
    ws.onerror = function(error) { 
        console.log(chatError(error));
    };
    
    // handle web socket open event
    ws.onopen = () => {
        ws.send(JSON.stringify(generateMessage(messageType.OPEN,""))); // send server 'new client' message
    };

    // handle web socket received message  
    ws.onmessage = (event) => {
      let data = JSON.parse(event.data); // parse received data into json object
      
      // determine the action based on the message type
      switch (data.type) {
        case messageType.OPEN: // new client
          userEntery(true,data); // add entry message and avatar
          break;
        case messageType.MESSAGE: // client message
          appendChatMessage(data);
          break;
        case messageType.CLOSE: // client exit
          userEntery(false,data); // add entry message and remove avatar
          break;
        default:
          console.log(messageTypeError); // unknown message type
      }
    };
};

/**
 * Send chat message
 */ 
const sendMessage = () => {
    let messageInput = document.querySelector("#message"); // get input text element
    if(messageInput.value.trim().length) { // check if message is valid
      ws.send(JSON.stringify(generateMessage(messageType.MESSAGE,messageInput.value))); // send message to web server
      messageInput.value = ""; // empty the input element
    }
};

/**
 * Dynamic strings
 */ 
const welcomeMessage = (name) => (`Welcome ${name}`);
const backgroundImageAvatar = (avatar) => (`url("${avatar}")`);
const activeUserMessage = (name) => (`${ellipsify(name)} is online`);
const getEntryMessage = (name, isEntry) => (`${name} has ${(isEntry? "entered" : "left")} the chat.`);
const activeUserId = (id) => (`active-user-${id}`);
const chatError = (error) => (`[error] ${error.message}`);  

/**
 * Constant strings
 */ 
const messageTypeError = "Unknown Message Type";