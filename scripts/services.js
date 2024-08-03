const calendarDateRow = document.querySelector(".calendar-date-row");
let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentDay = date.getDay();

let day = currentDay;
let year = currentYear;
let month = currentMonth;

let contactArr = [];

function getDaysInMonth(month, year){
    return new Date(year, month + 1, 0).getDate();
}

function getStartDay(month, year){
    return new Date(year, month, 1).getDay();
}

function createCalendar(month, year) {
    const daysInMonth = getDaysInMonth(month, year);
    const startDay = getStartDay(month, year);
    
    let dayCount = 1;
    const calendarRows = document.querySelectorAll(".calendar-date-row");
    
    calendarRows.forEach(row => {
        const calendarDays = row.querySelectorAll(".calendar-day");
        calendarDays.forEach(dayElement => {
            dayElement.textContent = "";
            dayElement.style.border = "none";
            const newDayElement = dayElement.cloneNode(true);
            dayElement.parentNode.replaceChild(newDayElement, dayElement);
        });
    });

    calendarRows.forEach((row, index) => {
        const calendarDays = row.querySelectorAll(".calendar-day");
        let rowIsEmpty = true;

        calendarDays.forEach((dayElement, dayIndex) => {
            if (index === 0 && dayIndex < startDay) {
                dayElement.textContent = "";
            } else if (dayCount <= daysInMonth) {
                dayElement.textContent = dayCount;
                dayCount++;
                rowIsEmpty = false;
            } else {
                dayElement.textContent = "";
            }

            if (dayElement.textContent === "") {
                dayElement.style.border = "none";
            } else {
                dayElement.style.border = "1px solid #A30000";
                dayElement.addEventListener('click', () => {
                    var selectedDate = dayElement.textContent;
                    var dateSubmission = document.querySelector('.date-submit');
                    dateSubmission.textContent = ("Date Scheduled: " + (month+1) + "/" + selectedDate + "/" + year);
                });
            }
        });

        if (rowIsEmpty) {
            row.style.display = "none";
        } else {
            row.style.display = "flex";
        }
    });
}

function openCalendar(i) {
    var plan = document.getElementById('plan' + i);
    var selectedPlan = plan.textContent;

    var planSubmission = document.querySelector('.plan-submit');
    planSubmission.textContent = ("Selected Plan: " + selectedPlan);

    var popupAddonsContainer = document.getElementById('popupAddonsContainer');
    if (popupAddonsContainer) {
        popupAddonsContainer.classList.add('show');
    } else {
        var popupDateContainer = document.getElementById('popupDateContainer');
        popupDateContainer.classList.add('show');
    }

    var popupContainer = document.getElementById('popupContainer');
    popupContainer.classList.remove('show');
}

function addonsSubmit() {
    var popupAddonsContainer = document.getElementById('popupAddonsContainer');
    if (popupAddonsContainer) {
        popupAddonsContainer.classList.remove('show');
    }

    var popupDateContainer = document.getElementById('popupDateContainer');
    popupDateContainer.classList.add('show');
}

let selectedArr = [];

function addonSelection(i) {
    var checkBox = document.getElementById('check' + i);
    var selection = document.getElementById('addon' + i).textContent;

    if (checkBox.checked) {
        if (!selectedArr.includes(selection)) {
            selectedArr.push(selection);
        }
    } else {
        selectedArr = selectedArr.filter(item => item !== selection);
    }

    var addonSubmission = document.querySelector('.addon-submit');
    addonSubmission.textContent = ("Add-Ons: " + selectedArr.join(', '));
}

createCalendar(currentMonth, currentYear);

const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

let currentMonthYear = months[month] + " " + year;

let calendarCurrentDate = document.querySelector(".calendar-current-date");
calendarCurrentDate.textContent = currentMonthYear

function prevDate(){
    if (month === currentMonth && year === currentYear) {
        return;
    }
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    currentMonthYear = months[month] + " " + year;
    calendarCurrentDate.textContent = currentMonthYear; 

    createCalendar(month, year);
}

function nextDate(){
    month++;
    if (month > 11){
        month = 0;
        year++;
    }
    currentMonthYear = months[month] + " " + year;
    calendarCurrentDate.textContent = currentMonthYear

    createCalendar(month, year);
}

function openPopup() {
    var popupContainer = document.getElementById('popupContainer');
    popupContainer.classList.add('show');
}

function closePopup() {
    var popupContainer = document.getElementById('popupContainer');
    popupContainer.classList.remove('show');

    var popupDateContainer = document.getElementById('popupDateContainer');
    popupDateContainer.classList.remove('show');

    var popupContactContainer = document.getElementById("popupContactContainer");
    popupContactContainer.classList.remove('show');

    var thanksPopupContainer = document.getElementById('popupThanksContainer');
    thanksPopupContainer.classList.remove('show');

    var addonsPopupContainer = document.getElementById('popupAddonsContainer');
    addonsPopupContainer.classList.remove('show');
}

function previousPlanPopup(){
    var popupDateContainer = document.getElementById('popupDateContainer');
    popupDateContainer.classList.remove('show');

    var popupAddons = document.getElementById('popupAddonsContainer');
    popupAddons.classList.remove('show');

    var popupContainer = document.getElementById('popupContainer');
    popupContainer.classList.add('show');
}

function previousPlanCalendar(){
    var popupContactContainer = document.getElementById('popupContactContainer');
    popupContactContainer.classList.remove('show');

    var popupDateContainer = document.getElementById('popupDateContainer');
    popupDateContainer.classList.add('show');
}

function openContact(){
    var popupDateContainer = document.getElementById("popupDateContainer");
    popupDateContainer.classList.remove('show');

    var popupContactContainer = document.getElementById("popupContactContainer");
    popupContactContainer.classList.add('show');
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function submitResponse(){
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
        nameSubmission.textContent = ("Customer Name: " + contactArr[0] + " " +contactArr[1]);

        var popupContactContainer = document.getElementById("popupContactContainer");
        popupContactContainer.classList.remove('show');

        var thanksPopupContainer = document.getElementById('popupThanksContainer');
        thanksPopupContainer.classList.add('show');
    }
}