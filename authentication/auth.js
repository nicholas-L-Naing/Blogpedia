$(document).ready(function() {
    let signUpForm = $("#sign_up_form");
    let logInForm = $("#log_in_form");
    let signUpBut = $("#sign-up");
    let logInBut = $("#log-in");
    let signSubmit = $("#signSubmit")
    const authentication = JSON.parse(localStorage.getItem("authentication"))

    if(!authentication){
        $("#log-out").css('display','none')
    }

    signUpBut.click(function() {
        logInForm.fadeOut(1500, function() {
            signUpForm.fadeIn(1500);
        });
    });

    logInBut.click(function() {
        signUpForm.fadeOut(1500, function() {
            logInForm.fadeIn(1500);
        });
    });
    //authentication system
    signUpForm.submit(function(e){
        let name = this.name.value
        let mail = this.mail.value
        let ps1 = this.ps1.value
        let ps2 = this.ps2.value
        if(ps1 == ps2){
            let data = {
                "name":name,
                "ps2":ps2
            }
            const auth = localStorage.setItem("authentication",JSON.stringify(data))
            alert("Account has been created!")
        } else{
            console.log("password not match")
        }
    })
    $("#log-out").click(function(){
        localStorage.clear()
        window.location.href = "http://127.0.0.1:5500/authentication/auth.html"
    }) 
    logInForm.submit(function(e){
        let logName = this.username.value
        let logPass = this.pass.value
        if(authentication){
            if (logName === authentication.name && logPass === authentication.ps2){
                window.location.href = "http://127.0.0.1:5500/blog-post/post_list.html"
                e.preventDefault()
            }else{
                alert("Please check your name and passord again!")
                return;
            }
        }else{
            alert("Register a new account first!")
        }
    })
        
});



