import Video from '../video/Video';
import CapabilityCard from './CapabilityCard';
import DeveloperCard from './DeveloperCard';
import './MainPage.scss';
import { mainPageText, videoURL } from '../../utils/constants';
import gamesIcon from '../../assets/images/games.png';
import statisticIcon from '../../assets/images/statistic.png';
import packIcon from '../../assets/images/pack.png';
import AndreyFoto from '../../assets/images/Andrey.jpg';
import SamvelFoto from '../../assets/images/Samvel.jpg';
import InnaFoto from '../../assets/images/Inna.jpg';

const MainPage = () => {
  const { capability: { games, pack, statistic }, about: { ...about } } = mainPageText;

  return (
    <main className="Main-page">
      <section className="Main-page__capability">
        <h2 className="Main-page__capability-title">Возможности</h2>
        <ul className="Main-page__capability-list">
          <li className="Main-page__capability-item">
            <CapabilityCard
              title="Игры"
              img={gamesIcon}
              info={games}
            />
          </li>
          <li className="Main-page__capability-item">
            <CapabilityCard
              title="Наборы слов"
              img={packIcon}
              info={pack}
            />
          </li>
          <li className="Main-page__capability-item">
            <CapabilityCard
              title="Статистика"
              img={statisticIcon}
              info={statistic}
            />
          </li>
        </ul>
      </section>
      <section className="Main-page__video">
        <Video src={videoURL} />
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
              // img={}
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
              // img={}
              info={about.Julia}
            />
          </li>
        </ul>
      </section>
    </main>
  );
};
export default MainPage;
