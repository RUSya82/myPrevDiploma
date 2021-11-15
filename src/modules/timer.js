export class Timer{
    constructor({

        hourSelector = '#timer-hours',
        minutesSelector = '#timer-minutes',
        secondsSelector = '#timer-seconds',
        deadline = '22 june 2021',
    }){
        try{
            this.hasError = false;

            this.hourSelector = document.querySelector(hourSelector);
            if(!this.hourSelector){
                this.hasError = true;
                throw new Error('can`t access hour selector')
            }
            this.minutesSelector = document.querySelector(minutesSelector);
            if(!this.minutesSelector){
                this.hasError = true;
                throw new Error('can`t access minute selector')
            }
            this.secondsSelector = document.querySelector(secondsSelector);
            if(!this.secondsSelector){
                this.hasError = true;
                throw new Error('can`t access seconds selector')
            }
            this.deadline = deadline;
            this.interval = 0;
        } catch (error){
            console.warn(error);
        }

    }
    init(){
        if(!this.hasError){
            this.render();
            this.interval = setInterval(this.render.bind(this), 1000);
        }
    }
    getTimeRemaining(){
        const currDate = new Date().getTime();
        const deadline = new Date(this.deadline).getTime();
        return (deadline - currDate)/1000;
    }
    getTimerSeconds(){
        return Math.floor(this.getTimeRemaining() % 60);
    }
    getTimerMinutes(){
        return Math.floor((this.getTimeRemaining() / 60) % 60);
    }
    getTimerHours(){
        return Math.floor(this.getTimeRemaining()/60/60);
    }
    render(){
        if(this.getTimeRemaining() > 0){
            this.hourSelector.textContent = this.addZero(this.getTimerHours());
            this.minutesSelector.textContent = this.addZero(this.getTimerMinutes());
            this.secondsSelector.textContent = this.addZero(this.getTimerSeconds());
        } else {
            this.hourSelector.textContent = '00';
            this.minutesSelector.textContent = '00';
            this.secondsSelector.textContent = '00';
            clearInterval(this.interval);
        }

    }
    addZero(value){
        return (+value < 10) ? `0${value}` : value;
    }
}