function registerUser(event) {
    var parent = event.target.parentNode;
    var email = parent.querySelector("#email-register").value;
    var password = parent.querySelector("#pwd-register").value;
    var name = parent.querySelector("#username-register").value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(result){
            console.log(result);
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {  
                    user.updateProfile({
                        displayName: name,
                    }).then(function(){
                        window.location.replace("https://daman1209arora.github.io/openbook/talk/index.html");
                    }).catch(function(error){
                        console.log("Failure");
                    });
                } 
                else {
                    console.log("None");
                }
            });
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });  
}

function loginUser(event) {
    var parent = event.target.parentNode;
    var email = parent.querySelector("#email-login").value;
    var password = parent.querySelector("#pwd-login").value;
    console.log(email, password);

    firebase.auth().signInWithEmailAndPassword(email, password) 
        .then(function(result){
            console.log(result);
            window.location.replace("../talk/index.html");
        })
        .catch(function(error){
            console.log("Something went wrong");
        });
}

function isLoggedIn() {
    var check = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {  
            window.location.replace("https://daman1209arora.github.io/openbook/talk/index.html");
        } 
        else {
            console.log("None");
        }
    });
    check();
}