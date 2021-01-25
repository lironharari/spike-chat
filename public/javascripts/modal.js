/**
 * Modal functionality 
 */

/**
 * Constant strings/variables
 */
const inputBorderColor = "#CCC";
const inputBorderColorError = "#FF0000";
const inputErrorAll = "Please fill in both fields.";
const inputErrorName = "Please fill in your name.";
const inputErrorAvatar = "Please upload an avatar.";
const inputErrorAvatarLoad = "Please try another image.";

/**
 * Handle modal form onsubmit event
 * @param {DOM Event} e - input event of form submit
 */ 
document.querySelector("#modal-form").onsubmit = (e) => {
  e.preventDefault(); //prevent default submit event handling
  enterChat(); // remove modal and enter chat
};

/**
 * Initiate the chat 
 */ 
const enterChat = () => {
    let nameInput = document.querySelector("#userName").value.trim(); // get trimmed name from input

    if(nameInput.length && userAvatar.length) { // check if name and avatar are valid
      userName = nameInput; // set client name
      populateHeader(); // set chat header
      closeModal(); // close chat login modal
      showChat(); // display chat
      initChat(); // initiate web socket
    }
    else{
      handleLoginError(nameInput, userAvatar); // show input errors
    }      
  };

/**
 * Display chat login modal
 */ 
const showModal = () => {
    // reset all input and error fields 
    let userName = document.querySelector("#userName");
    userName.value = "";
    let userAvatar = document.querySelector("#userAvatar");
    userAvatar.value = null;
    let messageInput = document.querySelector("#message");
    messageInput.value = "";
    let errorMessage = document.querySelector(".error");
    errorMessage.textContent = "";

    // display the modal
    let modal = document.querySelector("#welcomeScreen");
    modal.style.display = "block";
  };

/**
 * Display error messages
 * @param {string} name - name input
 * @param {string} avatar - avatar input
 */ 
const handleLoginError = (name, avatar) => {
    //get input elements
    let nameInput = document.querySelector("#userName");
    let userAvatar = document.querySelector("#userAvatar");
    //reset login input border color
    nameInput.style.borderColor = inputBorderColor;
    userAvatar.style.borderColor = inputBorderColor;

    // decide which error message to present
    if(name.length === 0 && avatar.length  === 0){ // both fields are empty
        //show input element error for both fields
        nameInput.style.borderColor = inputBorderColorError;
        userAvatar.style.borderColor = inputBorderColorError;
        modalError(inputErrorAll);
    }
    else if(name.length === 0){ // only name is missing
        //show input element error for name only
        nameInput.style.borderColor = inputBorderColorError;
        modalError(inputErrorName);
    }
    else { // only avatar is missing
        //show input element error for avatar only
        userAvatar.style.borderColor = inputBorderColorError;
        modalError(inputErrorAvatar);
    }
};

/**
 * Hide the modal
 */ 
const closeModal = () => {
    let modal = document.querySelector("#welcomeScreen");
    modal.style.display = "none";
};

/**
 * Display input error message
 * @param {string} message - error message
 */ 
const modalError = (message) => {
    let errorMessage = document.querySelector(".error");
    errorMessage.textContent = message;
};

/**
 * display modal on window load
 */ 
const loadModal = () => {
  window.onload = showModal;
};

loadModal(); // show modal