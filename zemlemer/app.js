document.getElementById("sendMessageBtn").addEventListener('click', sendMessage);

function sendMessage(e) {
    const name = document.getElementById('my-name').value;
    const email = document.getElementById('my-email').value;
    const message = document.getElementById('my-message').value;

    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Message: ", message);
    
    // validate
    if (name === '' || email === '') {
        // show error
    } else {
        // send
    }

    e.preventDefault();
}