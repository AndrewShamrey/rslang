import Video from '../video/Video';
import CapabilityCard from '../CapabilityCard/CapabilityCard';
import DeveloperCard from './DeveloperCard';
import './MainPage.scss';
import { MAIN_PAGE_TEXT, VIDEO_URL } from '../../utils/constants';
import gamesIcon from '../../assets/images/games.png';
import statisticIcon from '../../assets/images/statistic.png';
import dictionaryIcon from '../../assets/images/dictionary.png';
import AndreyFoto from '../../assets/images/Andrey.jpg';
import SamvelFoto from '../../assets/images/Samvel.jpg';
import InnaFoto from '../../assets/images/Inna.jpg';

const MainPage = () => {
  const { capability: { games, dictionary, statistic }, about: { ...about } } = MAIN_PAGE_TEXT;

  return (
    <main className="Main-page">
      <section className="Main-page__capability">
        <h2 className="Main-page__capability-title">
          <span className="name-style">
            RS Lang
          </span>
          <span>
            {' - открой глубины английского языка!'}
          </span>
        </h2>
        <ul className="Main-page__capability-list">
          <li className="Main-page__capability-item">
            <CapabilityCard
              title={games.title}
              subtitle={games.subTitle}
              img={gamesIcon}
              info={games.info}
            />
          </li>
          <li className="Main-page__capability-item">
            <CapabilityCard
              title={dictionary.title}
              subtitle={dictionary.subTitle}
              img={dictionaryIcon}
              info={dictionary.info}
            />
          </li>
          <li className="Main-page__capability-item">
            <CapabilityCard
              title={statistic.title}
              subtitle={statistic.subTitle}
              img={statisticIcon}
              info={statistic.info}
            />
          </li>
        </ul>
      </section>
      <section className="Main-page__video">
        <Video src={VIDEO_URL} />
      </section>
      <section className="Main-page__about">
        <h2 className="Main-page__about-title">О Команде</h2>
        <ul className="Main-page__about-list">
          <li className="Main-page__about-item">
            <DeveloperCard
              name="Андрей"
              img={AndreyFoto}
              info={about.Andrey}
            />
          </li>
          <li className="Main-page__about-item">
            <DeveloperCard
              name="Евгения"
              info={about.Eugenia}
            />
          </li>
          <li className="Main-page__about-item">
            <DeveloperCard
              name="Самвел"
              img={SamvelFoto}
              info={about.Samvel}
            />
          </li>
          <li className="Main-page__about-item">
            <DeveloperCard
              name="Инна"
              img={InnaFoto}
              info={about.Inna}
            />
          </li>
          <li className="Main-page__about-item">
            <DeveloperCard
              name="Юлия"
              info={about.Julia}
            />
          </li>
        </ul>
      </section>
    </main>
  );
};
export default MainPage;
