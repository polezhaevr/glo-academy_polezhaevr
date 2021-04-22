'use strict';

let book = document.querySelectorAll('.book'),
    body = document.querySelector('body'),
    adv = document.querySelector('.adv'),
    links = document.querySelectorAll('a'), 
    lists = document.querySelectorAll('ul'),
    chapter = lists[0].querySelectorAll('li'), 
    newChapter = document.createElement('li');

//Восстановить порядок книг:
book[0].before(book[1]);
book[4].after(book[3]);
book[5].after(book[2]);
//Заменить картинку заднего фона на другую из папки image:
body.style.backgroundImage = 'URL("image/you-dont-know-js.jpg")';
// /Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов"):
links[4].textContent = "Книга 3. this и Прототипы Объектов";
//Удалить рекламу со страницы:
adv.remove();
//Восстановить порядок глав во второй и пятой книге:
chapter[7].after(chapter[9]);
chapter[9].after(chapter[2]);
chapter[3].after(chapter[6]);
chapter[6].after(chapter[8]);

console.log(lists)

chapter = lists[5].querySelectorAll('li');

chapter[6].before(chapter[2]);
chapter[3].before(chapter[9]);
chapter[8].before(chapter[5]);

/*в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить 
её в правильное место*/
newChapter.innerText = 'Глава 8: За пределами ES6'; 
lists[2].append(newChapter);
chapter =lists[2].querySelectorAll('li');
chapter[8].after(chapter[10]);





