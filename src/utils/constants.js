import DefaultPhoto from '../assets/images/default-photo.jpg';

export const AMOUNT_OF_PAGES = 30;
export const AMOUNT_OF_GROUPS = 6;

export const MAX_IMAGE_SIZE = 4000000;
export const DEFAULT_PHOTO = DefaultPhoto;
export const BACK_URL = 'https://react-learnwords-113.herokuapp.com/';
export const MEDIA_URI = 'https://react-learnwords-example.herokuapp.com/';
export const HTML_TAGS_REGEXP = /(<b>|<\/b>|<i>|<\/i>)/g;
export const GAMES = {
  audiochallenge: 'audiochallenge',
  sprint: 'sprint',
  wordConstructor: 'wordConstructor',
};

export const VIDEO_URL = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4';
export const RSLANG_DATA_URL = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
export const MAIN_PAGE_TEXT = {
  capability: {
    games: {
      info:
        'Специально для приложения разработаны 4 мини-игры - "Саванна", "Спринт", "Аудиовызов" и "Конструктор слов". С их помощью запоминать слова гораздо проще!',
      title: 'Мини-игры',
      subTitle: 'Играй и учись!',
    },
    dictionary: {
      info:
        'Зарегистрируйся и открой доступ к своим словам! Играй в игры, собирай слова, сортируй их по категориям - всё для успешного изучения!',
      title: 'Словарь',
      subTitle: 'Адаптируй под себя!',
    },
    statistic: {
      info:
        'Какая у тебя сегодня самая длинная серия правильных ответов? Сколько слов ты выучил за сегодня? На эти и другие вопросы ты найдешь ответы на странице статистики. После регистрации - статистика за месяц и с иллюстрациями!',
      title: 'Статистика',
      subTitle: 'Наблюдай за прогрессом!',
    },
  },
  about: {
    Andrey: 'Бэкенд\nмини-игра "Саванна"',
    Eugenia: 'Мини-игра "Спринт"',
    Inna: 'Дизайн\nучебник',
    Julia: 'Авторизация\nмини-игра "Аудиовызов"',
    Samvel: 'Главная страница\nмини-игра "Конструктор слов"',
  },
};
export const LETTERS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
export const GAME_NAMES = [
  {
    name: 'Аудиовызов',
    path: '/audiochallenge',
  },
  {
    name: 'Конструктор слов',
    path: '/wordconstructor',
  },
  {
    name: 'Саванна',
    path: '/savannah',
  },
  {
    name: 'Спринт',
    path: '/sprint',
  },
];
