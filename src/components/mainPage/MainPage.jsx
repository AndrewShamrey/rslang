import Video from '../video/Video';
import './MainPage.scss';

const MainPage = () => (
  <main className="Main-page">
    <section className="Main-page__capability">
      <h2>Возможности</h2>
      <ul>
        <li>
          <h3>Игры</h3>
          <p>
            Изучать новые слова интереснее в игровой форме.
            Поэтому мы подготовили 4 увлекательных игр,
            чтобы учить английский было веселее.
          </p>
        </li>
        <li>
          <h3>Статистика</h3>
          <p>
            Статистика - позволяет анализировать свой прогресс.
          </p>
        </li>
        <li>
          <h3>Наборы слов</h3>
          <p>
            Если слов больше 20, создаётся новая страница. Единственное отличие в списке
          </p>
        </li>
      </ul>
    </section>
    <section className="Main-page__video">
      <Video />
    </section>
    <section className="Main-page__about">
      <h2>О Команде</h2>
      <ul>
        <li>
          <h3>Андрей</h3>
          <p>Бэкенд, мини-игра &quot;Саванна&quot;</p>
        </li>
        <li>
          <h3>Евгения</h3>
          <p>Мини-игра &quot;Спринт&quot;</p>
        </li>
        <li>
          <h3>Самвел</h3>
          <p>главная страница, мини-игра &quot;Конструктор слов&quot;</p>
        </li>
        <li>
          <h3>Инна</h3>
          <p>Дизайн, учебник</p>
        </li>
        <li>
          <h3>Юлия</h3>
          <p>Авторизация, мини-игра &quot;Аудиовызов&quot;</p>
        </li>
      </ul>
    </section>
  </main>
);
export default MainPage;
