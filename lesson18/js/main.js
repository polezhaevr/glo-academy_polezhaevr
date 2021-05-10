window.addEventListener('DOMContentLoaded', function() {
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
        } return {timeRemaining, hours, minutes, seconds};
        } 
  
  
      function updateClock() {
        let timer = getTimeRemaining();
        timerHours.textContent = zero(timer.hours);
        timerMinutes.textContent = zero(timer.minutes);
        timerSeconds.textContent = zero(timer.seconds);
  
        if(timer.timeRemaining < 0) {
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
    countTimer('4 May 2021');
  });