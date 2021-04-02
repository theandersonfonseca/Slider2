import './App.css';
import slides from './slides';

const SlidesList = ({ currentSlide }) => {
  return (
    <ul className="slides">
      {slides.map((slide) => (
        <li className="slide" key={slide}>
          <img
            className={currentSlide === slide ? 'img img-active' : 'img'}
            src={slide}
            alt={slide}
          />
        </li>
      ))}
    </ul>
  );
};

export default SlidesList;
