document.addEventListener('DOMContentLoaded', function(){
    let greetMsg = document.querySelector(".greeting");
    let errorMsgElem = document.querySelector('.error');
    if (errorMsgElem.innerHTML !== ''){
        greetMsg.innerHTML = '';
        setTimeout(function(){
            errorMsgElem.innerHTML = '';
        },3000)
    }
})