# Notebook

## Записная книжка. Технологии: [React, TS, SCSS, Redux-Saga, PHP, Cypress, Jest]

## Демо страница:

[стартовая страница на сервере](https://thylacine.ru/) `https://thylacine.ru/`

## Работа с локальной версией

- Node version v16.20.1

### Установка зависимостей

```commandline
npm i
```

### Установка: PHP, Apache, MySql + настройки

```commandline
docker-compose up
```

после этой команды в Docker отключаем notebook контейнер

### Установка дополнительных библиотек, драйверов

```commandline
docker-compose build
```

эта команда производится один раз

### Запускаем сервер с готовыми настройками и расширениями

```commandline
docker-compose up
```

### Запуск проекта

```commandline
npm start
```

URL: `http://localhost:3030/`

Тестовый аккаунт:  
логин: test  
пароль: 123456

### Сборка проекта в production

```commandline
npm run build
```

Появляется каталог dist в корне проекта

### Тестирование Cypress

```commandline
npm run cy:open
```

Перед этим обязательно запустите сервер ( npm start )

```commandline
npm run cy:run
```

Запустит автоматическое тестирование по всем файлам и выдаст результат в терминале

### Тестирование Jest

```commandline
npm run test
```

### Проверка и исправление ошибок в стилях

```commandline
npm run stylelint:fix
```

### Работа с сервером

- **init.sql** - Таблицы базы данных MySql, а также запись тестового пользователя test (создаются на сервере в Docker автоматически)
- **index.php** - Подключение к базе данных через PDO драйвер и полный доступ к CORS запросам
- **errorCodes.txt** - Список кодов возможных ошибок, возвращаемых сервером
- **captcha** - Капча, код имеет длину 6 символов, которые рандомно генерируются из шрифтов ComicSansMS и возвращаются в виде растрового изображения

### Работа с Cypress

- **helpers** - Вспомогательные утилиты для тестирования (авторизация, создание / удаление записей)
- **e2e** - Каталог, в котором располагаются тесты, проверяющие полную работу системы вместе с серверной частью (Docker должен быть обязательно запущен)
- **tsconfig.json** - Так как Cypress из-за глобальных типов конфликтует с Jest, TS правила необходимо изолировать отдельно

### Работа с Jest

- **\_\_test\_\_** - Каталог, где распологаются файлы Jest тестов
- **fileName.test.ts** - Пример именования файлов в каталоге \_\_test\_\_
