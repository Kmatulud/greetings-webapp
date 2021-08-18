document.addEventListener('DOMContentLoaded', function(){
    let errorMsgElem = document.querySelector('.error');
    if (errorMsgElem.innerHTML !== ''){
        setTimeout(function(){
            errorMsgElem.innerHTML = '';
        },3000)
    }
})