import React, { Component } from 'react';
import Button from './components/Button';
import './css/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "0",
      previous: [],
      nextIsReset: false,
      calculationFinished: false
    }
  }

  reset = () => {
    this.setState({current: "0", previous: [], nextIsReset: false, calculationFinished: false});
  }

  processButtonHelper = (symbol) => {
    if ([" / ", " - ", " + ", " * "].indexOf(symbol) > -1) {
      let {previous} = this.state;
      previous.push(this.state.current + symbol);
      this.setState({previous, nextIsReset: true});
    } else {
      if ((this.state.current === "0" && symbol !== ".") || this.state.nextIsReset) {
        this.setState({current: symbol, nextIsReset: false});
      } else {
        this.setState({current: this.state.current + symbol});
      }
    }
  }

  addToCurrent = (symbol) => {
    if (this.state.calculationFinished) {
      this.setState({current: "0", previous: [], nextIsReset: false, calculationFinished: false}, () => {
        this.processButtonHelper(symbol);
      });
    } else {
      this.processButtonHelper(symbol);
    }
  }

  calculate = (symbol) => {
    let {current, previous} = this.state;
    if (previous.length > 0) {
      let expression = "";
      previous.forEach((input) => {
        expression += input;
      });
      previous.push(current);
      current = eval(String(expression + current));
      this.setState({current, nextIsReset: true, calculationFinished: true});
    }
  }

  render() {
    let expression = "";
    this.state.previous.forEach((input) => {
      expression += input;
    });

    const buttons = [
      {symbol: "C", cols: 1, action: this.reset},
      {symbol: "(", cols: 1, action: this.addToCurrent},
      {symbol: ")", cols: 1, action: this.addToCurrent},
      {symbol: " / ", cols: 1, action: this.addToCurrent},
      {symbol: "7", cols: 1, action: this.addToCurrent},
      {symbol: "8", cols: 1, action: this.addToCurrent},
      {symbol: "9", cols: 1, action: this.addToCurrent},
      {symbol: " * ", cols: 1, action: this.addToCurrent},
      {symbol: "4", cols: 1, action: this.addToCurrent},
      {symbol: "5", cols: 1, action: this.addToCurrent},
      {symbol: "6", cols: 1, action: this.addToCurrent},
      {symbol: " - ", cols: 1, action: this.addToCurrent},
      {symbol: "1", cols: 1, action: this.addToCurrent},
      {symbol: "2", cols: 1, action: this.addToCurrent},
      {symbol: "3", cols: 1, action: this.addToCurrent},
      {symbol: " + ", cols: 1, action: this.addToCurrent},
      {symbol: "0", cols: 2, action: this.addToCurrent},
      {symbol: ".", cols: 1, action: this.addToCurrent},
      {symbol: "=", cols: 1, action: this.calculate}
    ];
    return (
      <div className="App">
        <h1>Simple calculator</h1>
        {this.state.previous.length > 0 ? 
          <div className="float-last">{expression}</div>
        : null}
        <input type="text" className="result" value={this.state.current} />

        {buttons.map((btn, i) => {
          return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
        })}

      </div>
    );
  }
}

export default App;
