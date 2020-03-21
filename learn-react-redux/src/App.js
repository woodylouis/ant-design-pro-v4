import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="jumbotron-heading text-center">{ this.props.counter }</h1>
        <p className="text-center">
          <button className="btn btn-primary mr-2">Increase</button>
          <button className="btn btn-danger my-2">Decrease</button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    counter: state.counter
  }
}

App.propTypes = {
  counter: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(App);