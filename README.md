## Реализация функций приложения:

### Категории расходов:

- Возможность создания категорий расходов, каждая из которых может включать подкатегории.
- Ограничение вложенности до двух уровней для удобства пользователя.

### Учёт расходов:

- Внесение расходов доступно как для основных категорий, так и для подкатегорий.
- Автоматическое суммирование расходов подкатегорий в общую сумму основной категории.

### Примеры использования:

- Создание категории "Автомобиль" с подкатегориями "Обслуживание" и "Топливо".
- Расходы в подкатегориях отражаются в итоговой сумме категории "Автомобиль".

### Анализ расходов:

- Функции для отображения расходов за день, неделю, месяц, а также за пользовательские периоды.
- Представление данных в форме таблиц или круговых диаграмм.

### Хранение данных:

- Использование базы данных Firebase.
- Индивидуальное пространство для каждого пользователя с аутентификацией через React-Firebase.

## Структура веб-страниц:

- **Главная страница:** Основная информация, доступная для всех посетителей.
- **О приложении:** Информационная страница с описанием функций приложения.
- **Авторизация:** Страницы входа и регистрации для пользователей.
- **Настройки:** Конфигурация категорий расходов, доступная после входа в систему.
- **Домашняя страница:** Управление доходами и расходами, доступ к сводке за последнюю неделю.
- **Аналитика:** Инструменты для изучения расходов по временным периодам с графическим представлением.

## Безопасность и доступ:

- Неавторизованный доступ к функционалу перенаправляется на страницу входа.

## Начало работы:

Для начала использования приложения выполните следующие шаги:

1. Клонируйте репозиторий на локальный компьютер.
2. Установите необходимые зависимости, выполнив команду: `npm i`
3. Запустите приложение в режиме разработки: `npm run start:dev`
