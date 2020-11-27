import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import { CharacterPage, HousesPage, BooksPage, BooksItem } from "../pages";

import GotService from "../../services/gotService";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    randomCharIsShown: true,

    error: false,
  };

  gotService = new GotService();
  // componentDidCatch() {
  //   this.setState({
  //     error: true,
  //   });
  // }
  toggleRandomChar = () => {
    this.setState({ randomCharIsShown: !this.state.randomCharIsShown });
  };

  render() {
    const compToShow = this.state.randomCharIsShown ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <Router>
        {/* <> chasto teryaetsya stili pri Router */}
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                {compToShow}
                <button className="toggle-btn" onClick={this.toggleRandomChar}>
                  Show Random Char Table
                </button>
              </Col>
            </Row>
            <Route path="/" exact component={() => <h1> Welcome</h1>} />
            <Route path="/characters" component={CharacterPage} />

            <Route path="/houses" component={HousesPage} />
            <Route path="/books" exact component={BooksPage} />
            <Route
              path="/books/:id"
              render={({match}) => {
                const { id } = match.params;
                return <BooksItem bookId={id} />;
              }}
            />
          </Container>
        </div>
      </Router>
    );
  }
}
