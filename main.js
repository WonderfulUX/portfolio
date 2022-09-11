//SLIDES
const slider = document.querySelector('.carousel-container')
const slidesCount = document.querySelectorAll('.carousel-slide').length;
let carouselElement = document.querySelectorAll('.carousel-img');
const carouselSlideValue = document.querySelector('.slide-number');
let slideName = document.querySelector('.slide-name');
let carouselSpan, translationValue, slideNumber, windowWidth;

//SLIDES CONTROLS
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.previous');
let hr = document.getElementsByTagName('hr')[0];

//NAVIGATION
const homeTitle = document.getElementById('home');
let menuItem = document.querySelectorAll('.menu-link');
let sections = document.querySelectorAll('.content');
let myName = document.querySelector('.name');
const navBtn = document.querySelector('.nav-btn');
const menu = document.querySelector('.menu');
const topLine = document.querySelector('.top');
const middleLine = document.querySelector('.middle');
const bottomLine = document.querySelector('.bottom');

//RESIZING
let resize850= false;
let resize1400= false;
const workSection = document.getElementById('work');



//EVENT LISTENERS
addEventListener('load',()=>{
    document.getElementById('home').classList.add('reveal');
});
addEventListener('resize', () => {
    reorganize();
});
nextBtn.addEventListener('click', slideRight);
previousBtn.addEventListener('click', slideLeft);
myName.addEventListener('click', resetPage);
menuItem.forEach(item=>{
    item.addEventListener('click', displaySection);
});
navBtn.addEventListener('click',toggleMenu);



//FUNCTIONS

function toggleMenu(){
    //mobile menu display
    menu.classList.toggle('visible');
    animateClassic();
}

function animateClassic(){
    //animate menu button
    topLine.classList.toggle('rotate225');
    middleLine.classList.toggle('translate150');
    bottomLine.classList.toggle('rotateM45');
}


function reorganize(){
    //rearrange carousel display on responsive testing when changing viewport size
    carouselSpan = getCarouselWidth();
    slideNumber = parseInt(carouselSlideValue.innerText);
    slideNumber --;
    translationValue = carouselSpan * slideNumber;
    slider.style.transform = `translateX(-${translationValue}px)`;
}


function resetPage(){
    //back to main screen
    removeHighlightLink();
    resetAllSection();
    displayHome();
}
function displayHome(){
    homeTitle.style.display ='block';
    homeTitle.classList.add('reveal');
}
function hideHome(){
    homeTitle.style.display ='none';
    homeTitle.classList.remove('reveal');
}


function displaySection(event){
    //display section content when clicking on link
    removeHighlightLink();
    resetAllSection();
    hideHome();
    event.target.classList.add('active-link');
    let activeSection = event.target.innerText.toLowerCase();
    activeSection ==='work' ||  activeSection ==='skillset'? document.getElementById(activeSection).style.display= 'flex': document.getElementById(activeSection).style.display= 'block';
    document.getElementById(activeSection).classList.add('reveal');
    toggleMenu();
}

function removeHighlightLink(){
    //reset active link
    document.querySelector('.active-link') ? document.querySelector('.active-link').classList.remove('active-link') : '';
}

function resetAllSection(){
    //reset active section
    if(document.querySelector('section.reveal')){
        document.querySelector('section.reveal').style.display="none";
        document.querySelector('section.reveal').classList.remove('reveal');
    }
}


function slideRight(){
    carouselSpan = getCarouselWidth();
    slideNumber = parseInt(carouselSlideValue.innerText);
    //if another slide's up
    if(slideNumber<slidesCount){
        translationValue = carouselSpan * slideNumber;
        slideNumber++;
        carouselSlideValue.innerText = slideNumber;
        slideNumber>1 ? previousBtn.disabled = false : '';
        slider.style.transform = `translateX(-${translationValue}px)`;
        updateHr(slideNumber);
        slideNumber=== slidesCount? nextBtn.disabled = true : '';
    }
}
function slideLeft(){
    carouselSpan = getCarouselWidth();
    slideNumber = parseInt(carouselSlideValue.innerText);
    //if another slide's down
    if(slideNumber>1){
        translationValue = carouselSpan * (slideNumber-2);
        slideNumber--;
        carouselSlideValue.innerText = slideNumber;
        slideNumber===1 ? previousBtn.disabled = true : '';
        slider.style.transform = `translateX(-${translationValue}px)`;
        updateHr(slideNumber);
        slideNumber < slidesCount? nextBtn.disabled = false : '';
    }
}
function getCarouselWidth(){
    return document.getElementById('work').offsetWidth;
}

function updateHr(value){
    switch (value){
        
        case 2 :
            hr.classList = "";
            slideName.innerText = 'Komès Landing page';
            hr.classList.add("komes");
            break;
            
        case 3 :
                hr.classList = "";
                slideName.innerText = 'The spot';
                hr.classList.add('thespot');
            break;

        case 4 :
                hr.classList = "";
                slideName.innerText = 'Caisses';
                hr.classList.add('caisses');
                break;

        default :
                hr.classList = "";
                slideName.innerText = 'Veggie Burger';
    }
}
