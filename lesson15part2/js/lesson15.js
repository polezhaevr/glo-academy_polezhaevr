'use strict';

class First {
    constructor() {}
    hello() {
        console.log('Привет я метод родителя!');
    }
}

class Second extends First {
    constructor() {
        super();
    }
    hello() {
        SpeechSynthesisUtterance.hello();
        console.log('А я наследуемый метод!');

    }
}


const lesson15 = new Second();
lesson15.hello();