var username; 
var db;
var auth;

function getName(){
    auth = firebase.auth();
    var checker = auth.onAuthStateChanged(function(user) {
        if (user) {
            username = user.displayName;
        } 
        else {
            window.location.replace("https://daman1209arora.github.io/openbook/auth/user.html");
        }
    });
}

async function logout(){
    console.log("Logging out");
    auth.signOut()
        .then(function(){
            window.location.replace("https://daman1209arora.github.io/openbook/auth/user.html")
        })
        .catch(function(error){
            console.log("Something went wrong");
        });
}

function getChatDOM(data) {
    var elem = document.createElement("DIV");
    elem.classList = ["row"];
    var offset = 0;
    if(data["sender"] == username)
        offset = 2;
    elem.innerHTML = `
        <div class = "col-sm-offset-${offset} col-sm-10 message-box">
            <p class = "sender"><b>${data["sender"]}</b></p>
            <p class = "message">${data["content"]}</p>
        </div>
    `;
    return elem;
}

function updateScroll() {
    var elem = document.getElementById("chat-box");
    elem.scrollTop = elem.scrollHeight;
}

async function loadMessages() {
    getName();
    db = firebase.firestore()
    var chatbox = document.getElementById("chat-box");
    db.collection("messages").orderBy("sentAt")
    .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            var elem = getChatDOM(change.doc.data());
            chatbox.appendChild(elem);
            updateScroll();
        });
    });
}

function msgTypeHandle(event){
    if(event.keyCode == 13 && !(event.shiftKey)){
        postMessage();
    }
}

function postMessage() {
    var msgNode = document.getElementById("message");
    var text = msgNode.value;
    msgNode.value = '';
    db.collection("messages").add({
        sender: username,
        content: text,
        sentAt: (new Date()).getTime()
    })
}