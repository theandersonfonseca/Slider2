import './App.css';
import slides from './slides';

const Controls = ({ handleClickOnControl, currentSlide }) => {
  return (
    <ul className="controls">
      {slides.map((slide) => (
        <li key={slide} onClick={handleClickOnControl}>
          <img
            className={
              currentSlide === slide ? 'control control-active' : 'control'
            }
            src={slide}
            alt={slide}
          />
        </li>
      ))}
    </ul>
  );
};

export default Controls;
