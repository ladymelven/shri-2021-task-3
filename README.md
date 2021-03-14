## Ход выполнения

### Шаг 1. Запуск

Приложение не компилится из-за ошибок в файле data.ts. Компилятору не нравится тип update в типах action. Заходим
в actions.ts и находим, что update не включен в список типов на экспорте - добавляем. Теперь все компилится - правда, с
warning-ами по поводу размеров файлов. Пожалуй, можно будет потом отделить зависимости, чтобы уменьшить файлы.

### Шаг 2. Чиним смену темы

1) Кнопка смены темы работает один раз, потом исчезает. Лезем в devtools - на самом деле там две отдельные кнопки, и у 
   кнопки "поставить светлую тему" display: none. Проблема в том, что при добавлении theme_dark не убирается theme_light.
   Поискав по репошке, я нашла, что класс задается в view.ts. Добавляем в функцию строку elem.className = ""; (очищаем 
   класс каждый раз перед тем, как добавить новый). Теперь тему можно переключать туда-обратно.
   

2) Выставила темную тему в DEFAULT_STATE в state.ts, также поправила дефолтные классы в index.html и frame.html
   
### Шаг 3. Чиним переход между слайдами

Не происходит перехода между слайдами ни автоматически, ни по кнопкам, хотя продюсер срабатывает. А индекс не апдейтится.

1) Проблема нашлась в файле selectors.ts, где функция выставления индекса слайда возвращала пустое значение. Закомментила 
   строку 18 - переключение заработало. Честно говоря, меня просто насторожило EMPTY там, где все остальные заканчиваются 
   на distinctUntilChanged(). В целом я не очень понимаю, как здесь устроен store, до сих пор имела дело только с менеджерами
   из коробки.


2) Кнопка "вперед" в менюшке переключает слайд назад. Нашла в index.ts, что нажатие на кнопку next отправляет действие 
   actionPrev(). Правим на actionNext, все переключается корректно.

### Шаг 4. Чиним прогресс-бар

Он есть в разметке, но не рендерится. Находим ошибку в index.css - в высоте контейнера не выставлены единицы измерения. 
Добавляем 'px', прогресс-бар появляется.

### Разное

Поправила var на const в view.ts (в том же коммите, где фиксится тема).

Так и не поняла, зачем нужен дескриптор свойств в data.ts и куда его полагается применить. Без него все работает. 
Лишняя деталь в наборе?..
