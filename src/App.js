import React from 'react';
import './App.css';
import slides from './Slides';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: slides[0],
      previousSlide: slides[slides.length - 1],
      nextSlide: slides[1],
    };
  }

  getSlide = (currentSlide, nextOrPrevious) => {
    let index = slides.findIndex((slide) => slide === currentSlide);
    index = nextOrPrevious === 'next' ? index + 1 : index - 1;

    if (!slides[index]) {
      return nextOrPrevious === 'next' ? slides[0] : slides[slides.length - 1];
    }

    return slides[index];
  };

  updateState = (currentSlide) => {
    this.setState({
      currentSlide: currentSlide,
      nextSlide: this.getSlide(currentSlide, 'next'),
      previousSlide: this.getSlide(currentSlide, 'previous'),
    });
  };

  componentDidMount = () => {
    this.interval = setInterval(
      () => this.updateState(this.state.nextSlide),
      5000
    );
  };

  componentWillUnmount = () => clearInterval(this.interval);

  setPreviousSlide = () => {
    this.componentWillUnmount();
    this.updateState(this.state.previousSlide);
    this.componentDidMount();
  };

  setNextSlide = () => {
    this.componentWillUnmount();
    this.updateState(this.state.nextSlide);
    this.componentDidMount();
  };

  handleClickOnControl = (e) => {
    const slide = e.target.alt;

    if (!slide) return;

    this.componentWillUnmount();
    this.updateState(slide);
    this.componentDidMount();
  };

  render() {
    return (
      <div className="container">
        <ul className="controls">
          {slides.map((slide) => (
            <li key={slide} onClick={this.handleClickOnControl}>
              <img
                className={
                  this.state.currentSlide === slide
                    ? 'control control-active'
                    : 'control'
                }
                src={slide}
                alt={slide}
              />
            </li>
          ))}
        </ul>

        <div className="slider">
          <span className="previous" onClick={this.setPreviousSlide}>
            {'<'}
          </span>

          <ul className="slides">
            {slides.map((slide) => (
              <li className="slide" key={slide}>
                <img
                  className={
                    this.state.currentSlide === slide ? 'img img-active' : 'img'
                  }
                  src={slide}
                  alt={slide}
                />
              </li>
            ))}
          </ul>

          <span className="next" onClick={this.setNextSlide}>
            {'>'}
          </span>
        </div>
      </div>
    );
  }
}

export default App;
