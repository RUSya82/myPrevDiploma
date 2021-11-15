import {MenuLinks} from "./menuLinks";
import {modalInstance} from "./modal";

export const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu');
    const menu = document.querySelector('.site-menu');
    const closeBtn = menu.querySelector('.close-btn');

    const openMenu = () => {
        menu.classList.add('active-menu');
    };
    const closeMenu = () => {
        menu.classList.remove('active-menu');
    };
    const toggleMenu = () => {
        menu.classList.toggle('active-menu');
    };
    const menuLinksInit = new MenuLinks({
        menuSelector: '.site-menu',
        menuItemSelector: '.menu-item',
        callback: closeMenu,
    });
    const scrollToElement = (element) => {
        element.scrollIntoView({
            behavior: 'smooth',
            // block: 'start'
        });
    };
    menu.addEventListener('click', (e) => {
       let target = e.target;
       e.preventDefault();
       let menuLink = target.closest('.menu-item');
       if(target === closeBtn){
           closeMenu();
       } else if(menuLink){

           const link = menuLink.querySelector('a');
           const href = link.getAttribute('href').slice(1);
           const elem = document.getElementById(href);
           //scrollToElement(elem);
           closeMenu();
       }
    });


    menuBtn.addEventListener('click', (e) => {
        toggleMenu();
    });

};