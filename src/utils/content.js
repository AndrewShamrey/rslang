export const START_PAGE = {
  audiochallenge: {
    title: 'Аудиовызов',
    description: 'Улучшает восприятие англиской речи на слух.',
  },
  level: 'Уровень',
  start: 'Начать',
  sprint: {
    title: 'Спринт',
    descrLine1: 'Истинная гонка на проверку знаний!',
    descrLine2: 'Укажите, верный ли перевод слова.',
    selectLabel: 'Выберите уровень сложности:',
    start: 'Начать игру',
  },
  savanna: {
    title: 'Саванна',
    description: 'Тренировка саванна поможет вам пополнить свой словарный запас. Чем больше слов вы знаете, тем больше очков опыта вы получите.',
  },
};

export const RESULT_PAGE = {
  title: 'Результат',
  amountOfWords: 'Количество слов',
  longestSeries: 'Самая длинная серия',
  correct: 'Правильные ответы',
  incorrect: 'Неправильные ответы',
  playAgain: 'Играть снова',
  return: 'Перейти на главную страницу',
  score: 'Баллы',
};

export const AUDIOCHALLENGE_GAME_PAGE = {
  pass: 'Пропустить',
  nextWord: 'Следующее слово',
};

export const VOCABLUARY_SETTINGS = {
  translations: 'Отображать перевод слов и предложений',
  buttons: 'Отображать кнопки “Сложные слова”, “Удаленные слова”',
  save: 'Сохранить',
  cancel: 'Отмена',
};

export const WORD_CARD = {
  nextWord: 'Следующее слово',
  previoseWord: 'Предыдущее слово',
};

export const WORD_CARD_TABLE = {
  savanna: 'Саванна',
  audiochallenge: 'Аудиовызов',
  sprint: 'Спринт',
  wordConstructor: 'Конструктор слов',
  difficult: 'Сложные',
  delete: 'Удалить',
};

export const STATISTICS_PAGE = {
  title: 'Статистика',
  shortHeader: 'За сегодня',
  wordsLearned: 'Изучено слов',
  rightsPercent: 'Правильных ответов',
  longestSeries: 'Самая длинная серия',
  savannaName: 'Саванна',
  audioName: 'Аудиовызов',
  constructorName: 'Конструктор слов',
  sprintName: 'Спринт',
  longHeader: 'За все время',
  wordsWholeTime: 'Всего изучено слов',
};

export const SPRINT_GAME = {
  points: 'баллов',
  right: 'Верно',
  wrong: 'Неверно',
};

export const EMPTY_STATS = {
  series: 0,
  words: 0,
  correct: 0,
  right: 0,
};

export const GAMES_STATS_COMMON = {
  savanna: {
    id: 1,
    css: 'savanna',
    title: STATISTICS_PAGE.savannaName,
  },
  audiochallenge: {
    id: 2,
    css: 'audio-game',
    title: STATISTICS_PAGE.audioName,
  },
  wordConstructor: {
    id: 3,
    css: 'constructor',
    title: STATISTICS_PAGE.constructorName,
  },
  sprint: {
    id: 4,
    css: 'sprint',
    title: STATISTICS_PAGE.sprintName,
  },
};
