import React, { Component } from "react";
import "./itemList.css";
//import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
export default class ItemList extends Component {
  //gotServce = new GotService();

  state = {
    itemList: null,
    error: false,
  };

  componentDidMount() {
    const { getData } = this.props;

  getData()
      .then((itemList) => {
        this.setState({ itemList });
      })
      //.catch(this.onError);
    //this.foo.bar = 0;
  }

  componentDidCatch() {
    this.onError();
  }

  onError=(status) =>{
    this.setState({
      itemList: null,
      error: true,
    });
  }

  renderItems(arr) {
      
    return arr.map((item) => {
      
        const {key} = item;
        
        const label = this.props.renderItem(item);

      return (
        <li
          className="list-group-item"
          key={key}
          onClick={() => {
            this.props.onItemSelected(key);
          }}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />;
    }

    const items = this.renderItems(itemList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}

ItemList.defaultProps = {
  onItemSelected: () => {}
}