import React from 'react';
import './App.css';
import slides from './slides';
import Controls from './Controls';
import SlidesList from './SlidesList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: slides[0],
      previousSlide: slides[slides.length - 1],
      nextSlide: slides[1],
    };
  }

  componentDidMount = () => {
    this.interval = setInterval(
      () => this.updateState(this.state.nextSlide),
      5000
    );
  };

  componentWillUnmount = () => clearInterval(this.interval);

  getSlide = (currentSlide, nextOrPrevious) => {
    let index = slides.findIndex((slide) => slide === currentSlide);
    index = nextOrPrevious === 'next' ? index + 1 : index - 1;

    if (!slides[index]) {
      return nextOrPrevious === 'next' ? slides[0] : slides[slides.length - 1];
    }

    return slides[index];
  };

  updateState = (currentSlide) => {
    this.componentWillUnmount();

    this.setState({
      currentSlide: currentSlide,
      nextSlide: this.getSlide(currentSlide, 'next'),
      previousSlide: this.getSlide(currentSlide, 'previous'),
    });

    this.componentDidMount();
  };

  handleClickOnControl = (e) => {
    const slide = e.target.alt;

    if (!slide) return;

    this.updateState(slide);
  };

  render() {
    return (
      <div className="container">
        <Controls
          handleClickOnControl={this.handleClickOnControl}
          currentSlide={this.state.currentSlide}
        />

        <div className="slider">
          <span
            className="previous"
            onClick={() => this.updateState(this.state.previousSlide)}
          >
            {'<'}
          </span>

          <SlidesList currentSlide={this.state.currentSlide} />

          <span
            className="next"
            onClick={() => this.updateState(this.state.nextSlide)}
          >
            {'>'}
          </span>
        </div>
      </div>
    );
  }
}

export default App;
