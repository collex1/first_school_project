let form = document.querySelector('.form');
let formInputs = document.querySelectorAll('.form_input');
let navBar = document.querySelector('.nav_bar');

function emptyInputs(array){
    let hasEmpty = false
    if (!array|| array.length<1){
        console.log('no input found');
        return true;
    }

    for (const [i, value] of array.entries()){
        if (value === ''){
            console.log(`input at index ${i} is empty`)
            hasEmpty=true;
        }
        
    }
    return hasEmpty;
}

function validInput(email, phone){
    const phoneRegex = /^\+\(\d{1,4}\)\s\d{3}-\d{3}-\d{4}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValidPhone = phoneRegex.test(phone.trim());
    const isValidEmail = emailRegex.test(email.trim());
    if (!isValidEmail){
        console.log('enter a valid email patter');
    }
    
    if (!isValidPhone){
        console.log('enter a valid phone number')
    }
    return isValidEmail && isValidPhone;
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let arrayFormInput = Array.from(formInputs).map(input=> input.value.trim());
    let email = document.querySelector('#email').value.trim();
    let phone = document.querySelector('#phone').value.trim();
    
    let isEmpty = emptyInputs(arrayFormInput);
    let isValid = validInput(email, phone);

    if (isEmpty || !isValid){
        return;
    }
})

let form_backdrop = document.querySelector('.form_backdrop');
const contact= document.querySelector('.contact');
contact.addEventListener('click', (e)=>{
    e.preventDefault()
    form_backdrop.classList.toggle('form_backdrop_active');
    document.body.classList.toggle('no_scroll');
    form.classList.toggle('form_open');
})

form_backdrop.addEventListener('click', (e)=>{
    form_backdrop.classList.toggle('form_backdrop_active');
    form.classList.toggle('form_open');
    document.body.classList.toggle('no_scroll');

})

let hamburger = document.querySelector('#hamburger');
hamburger.addEventListener('click',()=>{
    navBar.classList.toggle('open_nav_bar');
})