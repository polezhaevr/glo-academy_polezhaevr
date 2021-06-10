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

  // Slider 

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      dot = document.querySelectorAll('.dot'),
      slider = document.querySelector('.portfolio-content'), 
      portfolioDots = document.querySelector('.portfolio-dots');

    let currentSlide = 0,
        interval;


    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1000);

  };

  const addDot = () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item'),
      portfolioDots = document.querySelector('.portfolio-dots');

      portfolioItems.forEach(() => {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        portfolioDots.appendChild(dot);
      });

      portfolioDots.children[0].classList.add('dot-active');
  };

  addDot();
  slider();

  // Change photo

  const changePhoto = () => {
    const commandPhotos = document.querySelectorAll('.command__photo');
    
    const changingPhotos = (event) => {
			let target = event.target;

			if (target.classList.contains('command__photo')) {
				const lastSrc = target.src;

				target.src = target.dataset.img;
				target.dataset.img = lastSrc;
			}
		};

    commandPhotos.forEach((elem) => {
      elem.addEventListener('mouseover', changingPhotos);
    });

    commandPhotos.forEach((elem) => {
      elem.addEventListener('mouseout', changingPhotos);
    });

	};  

  changePhoto();

  // Check calculator

  const checkCalcBlock = () => {
    const calcItems = document.querySelectorAll('.calc-item');

    calcItems.forEach((elem) => {
      elem.addEventListener('input', (event) => {   
          event.target.value = event.target.value.replace(/\D/g, '');
      });
    });
  };

  checkCalcBlock();

  // Check inputs 

  const checkInputs = () => {
    const topForms = document.querySelectorAll('.top-form');
    
    const checkingInputs = (event) => {
      let target = event.target;
      let name = document.querySelector('.top-form')[0];
      if (target.name === 'user_name' || target.matches('.mess')) {
        target.value = target.value.replace(/[^а-яё ,.-]/gi, '');
      } 
      if (target.matches('.form-email')) {
        target.value = target.value.replace(/[а-яё ,?^]/gi, '');
      }
      if (target.matches('.form-phone')) {
        target.value = target.value.replace(/[^0-9() \.-]/g, '');
      }
    };  
       
    topForms.forEach((elem) => {
      elem.addEventListener('blur', (event) => {
        // Заменяет 2 и более тире на один
        elem.value = elem.value.replace(/-{1,}/g, "-");
        // Заменяет 2 и более пробела на один
        elem.value = elem.value.replace(/\s{1,}/gi, " ");
        // Удаляет пробелы и тире в начале и конце строки
        elem.value = elem.value.replace(/^\s|\s$|^-|-$/g, "");
        // Приводит первую букву каждого слова в Верхний регистр в поле "Ваше имя"
        if (elem.name === 'user_name') {
        
          let nameFirstLetter = [];
          let word = elem.value.split(" ");
          word.forEach((item) => {
            item = item[0].toUpperCase() + item.slice(1);
            nameFirstLetter.push(item);
            elem.value = nameFirstLetter.join(" ");
          });
        }
      }, true);
    });
       
        
      
   
    topForms.forEach(addEventListener('input', checkingInputs));
    
  };
  

  checkInputs();
});