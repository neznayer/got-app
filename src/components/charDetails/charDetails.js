import React, { Component } from "react";
import "./charDetails.css";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const Field = ({char, field, label}) => {
 
  return(
    <li className="list-group-item d-flex justify-content-between">
          <span className="term">{label}</span>
          <span>{char[field]}</span>
    </li>
  )
}

export {Field};

export default class CharDetails extends Component {
  gotServce = new GotService();

  state = {
    char: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    // predidushie props

    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  onCharDetailsLoaded = (char) => {
    this.setState({
      char: char,
      loading: false,
    });
  };

  onError() {
    this.setState({
      error: true,
      loading: false,
    });
  }

  updateChar() {
    const { charId } = this.props;

    if (!charId) {
      return;
    }

    this.setState({ loading: true });

    this.gotServce
      .getCharacter(charId)
      .then(this.onCharDetailsLoaded)
      .catch(this.onError); // kogda zakonchitsya async to vyzovetsya onCharDetailsLoaded i loading: false

    //this.foo.bar =  0;
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    if (!this.state.char) {
      return <span className="select-error"> Select a character</span>;
    }

    if (this.state.loading) {
      return (
        <div className="char-details rounded">
          <Spinner/>
        </div>
      )
    }
    const {char} = this.state;
    const {name} = char;
    
    return (
      <div className = 'char-details rounded'>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        {
          React.Children.map(this.props.children, (child) => { // perebiraet kazhdogo rebenka cloniruet ego s novym props {char}
            return React.cloneElement(child,{char})
          })
        }
      </ul>
    </div>
    )
  }
}

