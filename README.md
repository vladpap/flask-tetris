![image](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![image](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

# Flask Tetris Game

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Typical_Tetris_Game.svg/220px-Typical_Tetris_Game.svg.png" alt="Tetris"/>
</p>

## Описание
*Веб-приложение для классической игры Тетрис, разработанное с использованием Flask, JavaScript, HTML и CSS. Игра включает в себя систему подсчета очков, таблицу лидеров и возможность сохранения результатов игроков.*

## Особенности

* Классический геймплей тетриса
* Система подсчета очков
* Таблица лидеров (топ-10 игроков)
* Двойное управление (клавиатура/мышь)
* Сохранение результатов в базу данных
* Адаптивный дизайн

## Требования

* Python 3.6+
* Flask
* SQLite3 (встроен в Python)

## Установка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/vladpap/flask-tetris.git
   cd flask-tetris
   ```

2. Создайте виртуальное окружение:
   ```bash
   python -m venv venv
   ```

3. Активируйте виртуальное окружение:

   **Windows:**
   ```bash
   venv\Scripts\activate
   ```
   
   **Linux/MacOS:**
   ```bash
   source venv/bin/activate
   ```

4. Установите зависимости:
   ```bash
   pip install flask
   ```

5. Структура проекта:
   ```
   flask-tetris/
   ├── app.py
   ├── templates/
   │   └── index.html
   ├── static/
   │   ├── style.css
   │   └── tetris.js
   └── README.md
   └── .gitignore
   ```

## Запуск

1. Запустите Flask-приложение:
   ```bash
   python app.py
   ```

2. Откройте веб-браузер и перейдите по адресу:
   ```
   http://localhost:5000
   ```

## Управление

### Клавиатура:
* `←` или `A` - Движение влево
* `→` или `D` - Движение вправо
* `↑` или `W` - Поворот фигуры
* `Пробел` - Быстрое падение
* `P` - Пауза
* `ESC` - Выход из игры

### Мышь:
* Кнопки управления под игровым полем

## Геймплей

1. Введите свое имя перед началом игры
2. Управляйте падающими фигурами, используя клавиатуру или мышь
3. Собирайте полные линии для получения очков
4. Игра заканчивается, когда фигуры достигают верха поля
5. Ваш результат автоматически сохраняется в таблице лидеров

## Система очков

* За каждую собранную линию: **100 очков**
* Очки умножаются на количество линий, собранных одновременно

## Разработка

### Структура проекта:
* `app.py` - Серверная часть на Flask
* `templates/index.html` - HTML-шаблон игры
* `static/style.css` - CSS-стили
* `static/tetris.js` - Игровая логика на JavaScript

### База данных:
* Используется SQLite
* Автоматически создается при первом запуске
* Хранит имена игроков и их результаты

## Лицензия

[MIT License](LICENSE)

## Автор

[Владимир Папин](https://github.com/vladpap)

## Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для ваших изменений:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Зафиксируйте изменения:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Отправьте изменения в ваш форк:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Создайте Pull Request

## Поддержка

При возникновении проблем создавайте [Issue](https://github.com/vladpap/flask-tetris/issues) в репозитории проекта.
