import React, { Component } from 'react';
import { calculateResult } from './utils';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      userInput: [],
      result: [],
      error: 'Write something',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    const { input, result, error } = calculateResult(value);
    // Conver result to User Output Format
    this.setState({ userInput: input, result, error });
    event.preventDefault();
  }

  render() {
    const { userInput, result, error } = this.state;
    var spanUserInputtedText;
    var resultResponseRender;
    if(error!==null) {
      resultResponseRender = 
      <div>
        <p className="App-error">
          {error}
        </p>
      </div>
    }else{
      resultResponseRender = 
      <div>
        <p>
          {spanUserInputtedText}
        </p>
        <ol>
          {
            result.map((res) => (
              <li key={`${res.pA+res.pB+res.sum}`}>{userInput[res.pA]} and {userInput[res.pB]} sums up to {userInput[res.sum]}</li>
            ))
          }
        </ol>
      </div>
    }
    if (result.length<1) {
      spanUserInputtedText = <span>No Possible sums of combination was found for input {userInput.join(",")}</span>;
    }else if(result.length===1) {
      spanUserInputtedText = <span>Resulting sum combination for the inputs {userInput.join(",")} is</span>;
    } else {
      spanUserInputtedText = <span>Resulting sums combination for the inputs {userInput.join(",")} are</span>;
    }
    return (
      <div className="App">
        <form className="App-form" onSubmit={this.handleSubmit}>
          <h3>Please input numbers to find all of the possible sums of combinations</h3>
          <h5>You may use any character to seperate the input number such as 1,2,3 or 1;2;3, etc...</h5>
          <input size="32"
            className="effect-1"
            placeholder="Please type here..."
            type="text" value={this.state.value} onChange={this.handleChange} 
          />
          {resultResponseRender}
        </form>
      </div>
    );
  }
}

export default App;
