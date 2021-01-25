const inputBorderColor = "#CCC";
const inputBorderColorError = "#FF0000";
const inputErrorAll = "Please fill in both fields.";
const inputErrorName = "Please fill in your name.";
const inputErrorAvatar = "Please upload an avatar.";
const inputErrorAvatarLoad = "Please try another image.";
const messageTypeError = "Unknown Message Type";

document.querySelector("#modal-form").onsubmit = (e) => {
  e.preventDefault();
  enterChat();
};

const enterChat = () => {
    let nameInput = document.querySelector("#userName").value.trim();

    if(nameInput.length && avatarImage.length){
      userName = nameInput;
      populateHeader();
      closeModal();
      showChat();
      initChat();
    }
    else{
      handleLoginError(nameInput, avatarImage);
    }      
  };

const showModal = () => {
    let userName = document.querySelector("#userName");
    userName.value = "";
    let userAvatar = document.querySelector("#userAvatar");
    userAvatar.value = null;
    let messageInput = document.querySelector("#message");
    messageInput.value = "";

    let errorMessage = document.querySelector(".error");
    errorMessage.textContent = "";

    let modal = document.querySelector("#welcomeScreen");
    modal.style.display = "block";
  };

const handleLoginError = (name,avatar) => {
    let nameInput = document.querySelector("#userName");
    let userAvatar = document.querySelector("#userAvatar");
    nameInput.style.borderColor = inputBorderColor;
    userAvatar.style.borderColor = inputBorderColor;

    if(name.length === 0 && avatar.length  === 0){
        nameInput.style.borderColor = inputBorderColorError;
        userAvatar.style.borderColor = inputBorderColorError;
        modalError(inputErrorAll);
    }
    else if(name.length === 0){
        nameInput.style.borderColor = inputBorderColorError;
        modalError(inputErrorName);
    }
    else {
        userAvatar.style.borderColor = inputBorderColorError;
        modalError(inputErrorAvatar);
    }
};

const closeModal = () => {
    let modal = document.querySelector("#welcomeScreen");
    modal.style.display = "none";
};

const modalError = (message) => {
    let errorMessage = document.querySelector(".error");
    errorMessage.textContent = message;
};

const loadModal = () => {
  window.onload = showModal;
};

loadModal(); 