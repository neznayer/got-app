import React, { Component } from "react";
import "./itemDetails.css";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const Field = ({item, field, label}) => {
 
  return(
    <li className="list-group-item d-flex justify-content-between">
          <span className="term">{label}</span>
          <span>{item[field]}</span>
    </li>
  )
}

export {Field};

export default class ItemDetails extends Component {

  state = {
    item: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateItem();

  }
 
  componentDidUpdate(prevProps) {
    /// predidushie props

    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onItemDetailsLoaded = (item) => {
     
    this.setState({
      item,
      loading: false,
    });
  };

  onError() {
    this.setState({
      error: true,
      loading: false,
    });
  }

  updateItem() {
    const { itemId } = this.props;
    
    if (!itemId) {
      return;
    }

    this.setState({ loading: true });
    const { getData } = this.props;
    
    getData(this.props.itemId)
      .then(this.onItemDetailsLoaded)
      .catch(this.onError); // kogda zakonchitsya async to vyzovetsya onCharDetailsLoaded i loading: false

    //this.foo.bar =  0;
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    if (!this.state.item) {
      return <span className="select-error"> Select an item</span>;
    }

    if (this.state.loading) {
      return (
        <div className="item-details rounded">
          <Spinner/>
        </div>
      )
    }
    const {item} = this.state;
    const {name} = item;
    
    return (
      <div className = 'item-details rounded'>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        {
          React.Children.map(this.props.children, (child) => { // perebiraet kazhdogo rebenka cloniruet ego s novym props {char}
            return React.cloneElement(child,{item})
          })
        }
      </ul>
    </div>
    )
  }
}

