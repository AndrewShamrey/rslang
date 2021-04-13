import {
  STATISTICS_PAGE, EMPTY_STATS_SAVANNA, EMPTY_STATS_AUDIOCHALLENGE, EMPTY_STATS_CONSTRUCTOR,
  EMPTY_STATS_SPRINT,
} from '../../utils/content';
import { GAMES } from '../../utils/constants';

const dispatchShortTermStats = () => {
  const {
    audiochallenge, sprint, wordConstructor, savanna,
  } = GAMES;

  const date = new Date().toLocaleDateString();

  const localStorageData = localStorage.team113ShortTermStatistics;
  if (!localStorageData) {
    return [];
  }
  // const games = Object.values(GAMES);

  const data = JSON.parse(localStorageData);
  console.log(data);
  const savannaData = data[savanna];
  const sprintData = data[sprint];
  const audioData = data[audiochallenge];
  const constructorData = data[wordConstructor];
  console.log(savannaData, sprintData, audioData, constructorData);

  const savannaStats = savannaData && savannaData.date === date ? {
    id: 1,
    css: 'savanna',
    title: STATISTICS_PAGE.savannaName,
    series: savannaData.longestSeries,
    words: savannaData.learnedWords.length,
    right: Math.round((savannaData.correctAnswers / savannaData.learnedWords.length) * 100),
  } : EMPTY_STATS_SAVANNA;
  console.log(savannaStats);

  const audioStats = audioData && audioData.date === date ? {
    id: 2,
    css: 'audio-game',
    title: STATISTICS_PAGE.audioName,
    series: audioData.longestSeries,
    words: audioData.learnedWords.length,
    right: Math.round((audioData.correctAnswers / audioData.learnedWords.length) * 100),
  } : EMPTY_STATS_AUDIOCHALLENGE;

  const constructorStats = constructorData && constructorData.date === date ? {
    id: 3,
    css: 'constructor',
    title: STATISTICS_PAGE.constructorName,
    series: constructorData.longestSeries,
    words: constructorData.learnedWords.length,
    right: Math.round((constructorData.correctAnswers / constructorData.learnedWords.length)
      * 100),
  } : EMPTY_STATS_CONSTRUCTOR;

  const sprintStats = sprintData && sprintData.date === date ? {
    id: 4,
    css: 'sprint',
    title: STATISTICS_PAGE.sprintName,
    series: sprintData.longestSeries,
    words: sprintData.learnedWords.length,
    right: Math.round((sprintData.correctAnswers / sprintData.learnedWords.length) * 100),
  } : EMPTY_STATS_SPRINT;

  const returnData = [savannaStats, audioStats, constructorStats, sprintStats];
  return returnData;
};

export default dispatchShortTermStats;
