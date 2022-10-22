/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const navBarList = document.getElementById('navbar__list');
const sections = document.getElementsByTagName('section');
const header = document.getElementById('home');
const scrollToTop = document.querySelector('#back-to-top');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * @description  is the item in viewport
 * @param {HTMLElement} el element of viewport
 * @returns {boolean} return true if in viewport , false if not
 * @reference for more info https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
 */

const isInViewport = (el) => {
    var bounding = el.getBoundingClientRect();
    // minuse 65 form the top menu
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom - 65 <= el.clientHeight &&
        bounding.right <= el.clientWidth
    );
}

/**
 * @description  add class 'active' to active navbar 
 * @param {HTMLElement} el element of sections
 */
const addMenuClassActive = (el) => {
    removeMenuClassActive();
    const navbarMenu = document.querySelectorAll('.nav_menu_item');
    for (const nvaItem of navbarMenu) {
        if (nvaItem.getAttribute('data-nav') == el.getAttribute("data-nav")) {
            nvaItem.classList.add('nav__active');
        }
    }
}

/**
 * @description  remove class 'active' from navbar
 */
const removeMenuClassActive = () => {
    const navbarMenu = document.querySelectorAll('.nav_menu_item');
    for (const nvaItem of navbarMenu) {
        nvaItem.classList.remove('nav__active');
    }
}

/**
 * @description hide navbar after 5 seconds while not scrolling and it present on page load.
 */
const hideNavbar = () => {
    setTimeout(() => {
        navBarList.classList.add('hide__nav')
    }, 5000);
}

/**
 * @description show navbar while scrolling
 */
const showNavbar = () => {
    setTimeout(() => {
        navBarList.classList.remove('hide__nav')
    }, 0);
}

/**
 * 
 * @description show scroll to top button 
 */
const showScrollToTop = () => scrollToTop.style.display = 'block';

/**
 * 
 * @description hide scroll to top button
 */
const hideScrollToTop = () => scrollToTop.style.display = 'none';

/**
* @description Add class 'active' to section when near top of viewport
* @param {HTMLElement} el element of sections
*/
const addClassActiveSection = (el) => {
    el.classList.add('active');
}

/**
 * @description Remove class 'active' from section when Leave it 
 * @param {HTMLElement} el element of sections
 */
const removeClassActiveSection = (el) => {
    el.classList.remove('active');
}

/**
 * @description Scroll to anchor ID using scrollTO event
 * @param {HTMLElement} el element of sections
 * @param {Event.target} target element fo anchor
 */
const scrollToAnchor = (el, target) => {
    if (el.getAttribute('data-nav') === target.innerText) {
        el.scrollIntoView({ behavior: 'smooth' });
        addMenuClassActive(el);
    }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the navbar
const docFarg = document.createDocumentFragment();

// add Home to menu
const headerDataNav = header.getAttribute('data-nav');
const headerId = header.getAttribute('id');
let homeLiElement = document.createElement('li');
homeLiElement.dataset.nav = headerDataNav;
homeLiElement.classList.add('nav_menu_item');
homeLiElement.innerHTML = `<a href="#${headerId}" title="go to ${headerId}" class="nav_menu_link"> ${headerDataNav}</a>`;
docFarg.appendChild(homeLiElement);

// add Section
for (const item of sections) {
    const sectionDataNav = item.getAttribute('data-nav');
    const sectionId = item.getAttribute('id');
    let liElement = document.createElement('li');
    liElement.dataset.nav = sectionDataNav;
    liElement.classList.add('nav_menu_item');
    const aElement = document.createElement('a');
    aElement.innerText = sectionDataNav;
    aElement.href = `#${sectionId}`;
    aElement.title = `go to ${sectionId}`;
    liElement.appendChild(aElement);
    docFarg.appendChild(liElement);
}
navBarList.append(docFarg);


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 




// Scroll to section on link click
navBarList.addEventListener('click', (event) => {
    if (event.target.nodeName.toLowerCase() == 'a') {
        event.preventDefault();
        for (const item of sections) {
            scrollToAnchor(item, event.target);
        }
        scrollToAnchor(header, event.target);
    }
});

// Set sections as active
document.addEventListener('scroll', () => {
    for (const item of sections) {
        if (isInViewport(item)) {
            addMenuClassActive(item);
            addClassActiveSection(item);
            showNavbar();
            showScrollToTop();
            //transition effect for first tiem
            item.classList.add('shown');
        }
        else if (isInViewport(header)) {
            addMenuClassActive(header);
            addClassActiveSection(header);
            hideNavbar();
            hideScrollToTop();
        }
        else {
            removeClassActiveSection(item);
            removeClassActiveSection(header);
            showNavbar();
        }
    }
});


// move to up somootly 
scrollToTop.addEventListener('click', (event) => {
    event.preventDefault();
    header.scrollIntoView({ behavior: 'smooth' });
});


