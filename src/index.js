import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class A extends React.Component {

  state = {
    name: 'zyl'
  }

  test() {
    console.log(this.state.name);
  }
  render() {
    return <p onClick={this.test}>aaa</p>
  }
}

class B extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'bbbbb'
    }
  }

  test() {
    console.log(this.state.msg);
  }

  render() {
    return <p onClick={this.test}>bbb</p>
  }
}

class App extends Component {
  render() {
    return <div><A /><B /></div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

