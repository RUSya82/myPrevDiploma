class Modal {
    constructor({
                    modal ,
                    buttonsClassName = 'modal-activator',
                    modalActiveClass = 'modal-active',
                    modalContentClass = 'modal-content',
                    buttonCloseClass = 'modal-close',
                    useEscape = true,
                    useFadeCLose = true,
                }) {
        try{
            this.modal = modal;
            this.modalActivators = document.querySelectorAll('.' + buttonsClassName);
            this.modalActiveClass = modalActiveClass;
            this.modalContentClass = modalContentClass;
            this.buttonCloseClass = buttonCloseClass;
            this.useEscape = useEscape;
            this.useFadeCLose = useFadeCLose;
            if (modal){
                this.init();
            }
        } catch (error){
            console.warn(error);
        }


    }

    init() {
        this.addListener();
    }

    addListener() {
        this.modalActivators.forEach(activator => {
            activator.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal()
            });
        });
        this.modal.addEventListener('click', (e) => {
            let isModal;
            if(this.useFadeCLose){
                isModal = e.target.closest(`.${this.modalContentClass}`);
            } else {
                isModal = true;
            }
            const isCloseBtn = e.target.closest(`.${this.buttonCloseClass}`);
            if (!isModal || isCloseBtn) {
                this.closeModal();
            }
        });
        if(this.useEscape){
            document.addEventListener('keydown', (event) =>  {
                if (event.key === 'Escape') {
                    this.closeModal();
                }
            });
        }

    }

    openModal(callback = () => this.blockBody()) {
        this.modal.classList.add(this.modalActiveClass);
        callback();
    }

    closeModal(callBack = () => this.unBlockBody()) {
        this.modal.classList.remove(this.modalActiveClass);
        callBack();
    }

    calcScroll() {
        let div = document.createElement('div');
        div.style.width = '500px';
        div.style.height = '500px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

    toggleLockBody() {
        const body = document.body;
        body.classList.toggle('lock');
        const bodyScroll = this.calcScroll();
        if (body.classList.contains('lock')) {
            body.style.marginRight = `${bodyScroll}px`;
        } else {
            body.style.marginRight = `0`;
        }
    }

    blockBody() {
        const body = document.body;
        body.style.overflow = 'hidden';
        const bodyScroll = this.calcScroll();
        body.style.marginRight = `${bodyScroll}px`;
    }

    unBlockBody() {
        setTimeout(() => {
            const body = document.body;
            body.style.overflow = 'auto';
            body.style.marginRight = `0`;
        }, 200)
    }
    static modalGetInstance(){
        const data = [];
        return function (params){
            let object = data.find(item => item.modal === params.modal);
            console.log(data)
            if(object){
                return object;
            } else {
                const obj = new Modal(params);
                data.push(obj);
                return obj;
            }
        }
    }
}


export const modalInstance = Modal.modalGetInstance();