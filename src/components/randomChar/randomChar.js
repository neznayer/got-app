import React, { Component } from "react";
import "./randomChar.css";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import PropTypes from 'prop-types';

export default class RandomChar extends Component {


  gotService = new GotService();
  state = {
    char: {},
    loading: true,
    error: false,
  };



  onCharLoaded(char) {
    
    this.setState({
      char,
      loading: false,
      error: false,
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateCharacter = () => {
    //this.foo.bar = 0;
    const id = Math.floor(Math.random() * 140 + 25); // ot 25 do 140

    this.gotService
      .getCharacter(id)
      .then((char) => {
        this.onCharLoaded(char);
      }).catch(this.onError);
  };

  componentDidMount() {
    // kogda komponent otrisovalsya
    this.updateCharacter();
    this.timerId = setInterval(this.updateCharacter, this.props.interval);
  }


  componentWillUnmount() {
    clearInterval(this.timerId); // luchshee mesto chtoby ostanovit timeIntervals
    
  }

  render() {
  
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className="random-block rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}


RandomChar.defaultProps = {
  interval: 15000
}

RandomChar.propTypes = {
  interval: PropTypes.number // proverka na tip interval
}

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;
  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  );
};
