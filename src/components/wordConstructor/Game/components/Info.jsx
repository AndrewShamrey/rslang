import React from 'react';
import logo from '../../assets/puzzle.png';

const Info = (props) => {
  const { infoIsOpen } = props;
  return infoIsOpen ? (
    <div className="WordConstructor__info">
      <img src={logo} alt="logo" className="WordConstructor__infoLogo" />
      <h2 className="WordConstructor__infoSlogan">Собери слово из букв!</h2>
      <ol className="WordConstructor__infoList">
        <li className="WordConstructor__infoItem">Кликайте по буквам в нужном порядке, чтобы собрать оригинальное слово.</li>
        <li className="WordConstructor__infoItem">Если выпало 2 слова, то знак пробела также нужно кликнуть.</li>
        <li className="WordConstructor__infoItem">Если количество буквы больше одного, то в верхнем правом углу указано актуальное количество.</li>
        <li className="WordConstructor__infoItem">Доступно управление с клавиатуры. Просто нажмите соответствующую букву.</li>
      </ol>
    </div>
  ) : null;
};

export default Info;
