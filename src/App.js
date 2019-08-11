import React from 'react';
import './App.css';

const ymString = `
`;

const dgString = `digraph G {
  "Welcome" -> "To"
  "To" -> "Web"
  "To" -> "GraphViz!"
}
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ymValue: ymString,
      dgValue: dgString
    };
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      dgValue: event.target.value
    });
  };
  handleYamlChange = (event) => {
    this.setState({
      ...this.state,
      ymValue: event.target.value
    });
  };

  render () {
      return (
      <div className="App">
        <header className="App-header">
          <p>Hello World!!!</p>
          <textarea id="yaml_data" rows="5" cols="80" width="100%" wrap="off" value={this.state.ymValue}
            onChange={this.handleYamlChange}
          ></textarea>
          <textarea id="graphviz_data" rows="5" cols="80" width="100%" wrap="off" value={this.state.dgValue}
            onChange={this.handleChange}
          >
          </textarea>
          <button id="generate_btn" disabled><b>Loading...</b></button>
          <div id="graphviz_svg_div"></div>
        </header>
      </div>
    );
  }
}

export default App;
