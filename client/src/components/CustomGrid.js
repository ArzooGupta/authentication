import React from 'react';

export default class ConfigureService extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      keys: [],
      values: []
    }
  }
  

  componentWillMount() {
    this.decomposeValue();
  }

  render() {
    const environments = this.state.keys.map((key, index) => {
      return (
        <li key={index}>
          <input type="text" value={key} onChange={this.handleKeyChange.bind(this, index)} />:
          <input type="text" value={this.state.values[index]} onChange={this.handleValueChange.bind(this, index)} />
        </li>
      );
    });

    return (
      <div>
        <h1>{this.state.name}</h1>
        <ul>{environments}</ul>
        <button type="button" onClick={this.handleAddNewEnvironment.bind(this)}>New</button>
        <button type="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
      </div>
    );
  }

  decomposeValue() {
    console.log(this.props.value);
    const inputValue = this.props.value;
    console.log("dfg"+inputValue);
    const outputState = {};
  //  console.log("asdfghj"+inputValue.name[this.props.i]);
   // console.log('Input value',this.props.name);
   // var b= inputValue.name[this.props.i];
    outputState.name = this.props.name;
 //   console.log("outputstate"+outputState.name);
    // Push keys from inputValue.environment to outputState.keys
    if(!inputValue.environment) { inputValue.environment = {}; }
    console.log('inputValue', inputValue);
    outputState.keys = Object.keys(inputValue.environment);

    // TODO: Push values from inputValue.environment to outputStates.values
    outputState.values = outputState.keys.map((key) => {
      return inputValue.environment[key];
    });

    // Set outputState in state.
    this.setState(outputState);
   
  }

  composeValue() {
    const keys = this.state.keys;
    const values = this.state.values;
    const environment = {};
    keys.forEach((key, index) => {
      environment[key] = values[index];
    });
    console.log('keys:', keys);
    console.log('environment:', environment);

    delete environment[''];

    const value = this.props.value;
    value.environment = environment;

    return value;
  }

  handleSubmit() {
    this.props.onChange(this.composeValue());
  }

  handleAddNewEnvironment() {
    const keys = this.state.keys;
    const values = this.state.values;

    if(keys.indexOf('') < 0) {
      keys.push('');
      values.push('');
      this.setState({keys: keys, values: values});
    }
  }

  handleKeyChange(index, event) {
    const newKey = event.target.value;
    const keys = this.state.keys;

    keys.splice(index, 1, newKey);

    this.setState({keys: keys});
  }

  handleValueChange(index, event) {
    const newValue = event.target.value;
    const values = this.state.values;

    values.splice(index, 1, newValue);

    this.setState({values: values});
  }
}
