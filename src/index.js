import {Timer} from "./modules/timer";

const timer = new Timer({
    deadline: '30 nov 2021',
    hourSelector: '#timer-hours'
});
timer.init();
const tab = document.querySelectorAll('.service-header-tab');
tab.forEach(item => {
    item.addEventListener('click', (e) => {
        console.log(e.target)
    })
})
