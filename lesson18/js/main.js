window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  // Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds'),
      zeroInterval = 0;


    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = 0,
        minutes = 0,
        hours = 0;
      if (timeRemaining > 0) {
        seconds = Math.floor(timeRemaining % 60);
        minutes = Math.floor((timeRemaining / 60) % 60);
        hours = Math.floor(timeRemaining / 60 / 60);
      }
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    }


    function updateClock() {
      let timer = getTimeRemaining();
      timerHours.textContent = zero(timer.hours);
      timerMinutes.textContent = zero(timer.minutes);
      timerSeconds.textContent = zero(timer.seconds);

      if (timer.timeRemaining < 0) {
        clearInterval(zeroInterval);
      }
    }

    function zero(el) {
      if (String(el).length === 1) {
        return '0' + el;
      } else {
        return el;
      }
    }

    zeroInterval = setInterval(updateClock, 1000);

  }
  countTimer('20 May 2021');

  //Menu

  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    
    menu.addEventListener('click', (event) => {
      let target = event.target;
      
      if (!target.matches('a')) {
          return;
      } else {
        handlerMenu(event);
        }
      
    });

  };

  toggleMenu();

  //popup 

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popUpClose = document.querySelector('.popup-close'),
      popUpContent = document.querySelector('.popup-content');


    const animationPopUp = () => {
      let start = Date.now();

      let timer = setInterval(function () {
        let timePassed = Date.now() - start;
        document.querySelector('.popup-close'),
          popUpContent.style.top = timePassed / 10 + 'px';

        if (timePassed > 2000) clearInterval(timer);

      }, 25)
    };


    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        const screenWidth = window.screen.width;
        popup.style.display = 'block';

        if (screenWidth > 768) {

          animationPopUp();
        }
      });
    });

    popUpClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = 'none';
        }
      }

    });
  };
  togglePopup();

  //tabs

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tabContent[i].classList.add('d-none');
          tab[i].classList.remove('active');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      };
    });

  };

  tabs();
});