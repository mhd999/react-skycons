import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
const Skycons = require('skycons')(window);

class ReactSkycons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skycons: new Skycons({'color': this.props.color})
    };
  }

  componentDidMount() {
    this.state.skycons.add(ReactDOM.findDOMNode(this), Skycons[this.props.icon]);

    if (this.props.autoplay) {
      this.state.skycons.play();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.skycons.set(ReactDOM.findDOMNode(this), Skycons[nextProps.icon]);
  }

  componentWillUnmount() {
    this.state.skycons.pause();
    this.state.skycons.remove(ReactDOM.findDOMNode(this));
  }

  play() {
    this.state.skycons.play();
  }

  pause() {
    this.state.skycons.pause();
  }

  render() {
    let props = {};

    const defaultStyle = {
      width: '100%',
      height: '100%'
    };

    for (let prop in this.props) {
      props[prop] = this.props[prop];
    }

    delete props.autoplay;

    return (
      <canvas style={defaultStyle} {...props} />
    );
  }
}

ReactSkycons.defaultProps = {
  color: null,
  autoplay: true
};

ReactSkycons.propTypes = {
  color: PropTypes.string,
  autoplay: PropTypes.bool,
  icon: PropTypes.oneOf([
    'clear-day',
    'clear-night',
    'partly-cloudy-day',
    'partly-cloudy-night',
    'cloudy',
    'rain',
    'sleet',
    'snow',
    'wind',
    'fog'
  ])
};

export default ReactSkycons;
