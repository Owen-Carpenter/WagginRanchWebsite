let contactArr = [];

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function submitContact(){
    contactArr = [];

    let searchLength = document.querySelectorAll('.searchText').length;
    
    for (let i = 0; i < searchLength; i++){
        contactArr.push(document.getElementsByClassName('searchText')[i].value);
    }
    
    //Name validation
    if(contactArr[0] === "" || contactArr[1] === ""){
        alert('Input a valid name');
    }
    //E-mail validation
    else if(!validateEmail(contactArr[2])){
        alert('Input a valid email');
    }
    //Phone number validation
    else if(contactArr[3] === "" || contactArr[3].length !== 10){
        alert('Input a valid phone number');
    }
    else{
        var nameSubmission = document.querySelector('.name-submit');
        nameSubmission.textContent = (" " + contactArr[0] + " " + contactArr[1] + "!");

        var thanksContainer = document.getElementById('thanksContainer');
        thanksContainer.classList.add('show');
    }
}

function closePopup(){
    var thanksPopup = document.getElementById('thanksContainer');
    thanksContainer.classList.remove('show');
}

