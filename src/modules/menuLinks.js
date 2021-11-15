export class MenuLinks {
    constructor({
        menuSelector = '.menu',
        menuItemSelector = '.menu-item',
        duration = 200,
        offset = 0,
        callback ,
                }) {
        try{
            this.menu = document.querySelector(menuSelector);
            if(!this.menu){
                throw new Error("Not menu");
            }
            this.menuItemSelector = menuItemSelector;
            this.duration = duration;
            this.offset = offset;
            this.callback = callback;
            this.init();
        } catch (error) {
            console.warn(error);
        }
    }
    init(){
        this.addListeners();
    }
    scrollToElement (element) {
        let Id; //id анимации
        let start = performance.now();  //время старта
        let topPosition = element.getBoundingClientRect().top; //текущая позиция элемента
        let currentDocumentPosition = document.documentElement.scrollTop;//текущая прокрутка документа
        let progress = 0;           //прогресс анимации
        let animateScroll = () => {
            let now = performance.now();    //текущее время
            progress = (now - start) / this.duration;  //вычисляем прогресс
            if (progress <= 1) {
                document.documentElement.scrollTop = currentDocumentPosition + topPosition * progress;
                Id = requestAnimationFrame(animateScroll);
            } else {
                document.documentElement.scrollTop = currentDocumentPosition + topPosition;
                cancelAnimationFrame(Id);
            }
        };
        animateScroll();
    };
    addListeners() {
        if(this.menu){
            this.menu.addEventListener('click', (e) => {
               e.preventDefault();
                const target = e.target.closest(this.menuItemSelector);
                if(target){
                    const targetBlockId = target.querySelector('a').getAttribute('href').slice(1);
                    const targetBlock = document.getElementById(targetBlockId);
                    this.scrollToElement(targetBlock, this.duration);
                    if(this.callback){
                        this.callback();
                    }
                }
            });
        }
    }
}