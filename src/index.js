import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const { format } = require('./util');


format();
console.log('hello world');

function test() {
  return class extends Component {
    render(){
      return <p></p>
    }
  }
}
test()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'hello world'
    }
  }

  test() {
    console.log(this.state.text)
  }
  render() {
    return <p onClick={this.test}>{ this.state.text }</p>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

