import React from 'react';
import './App.css';
import YAML from 'yaml';


const ymString = `Requests:
- id: 1
  popis: Management cerpacich stanic
  final: false
- id: 2
  popis: Vytvorenie nadrze
- id:        3
  popis:     Prehlad stavu nadrzi
- id:        4
  popis:     Notifikacia o alarme na nadrzi 
- id:        5
  popis:     Zmena aktualneho\\nstavu nadrzi 
- id:        6
  popis:     Monitorovanie nadrzi 
- id:        7
  popis:     Generovanie alarmov nadrzi 
- id:        8
  popis:     Generovanie navrhov objednavok hmoty
- id:        8
  popis:     Zber informacii o faktoroch pre navrh objednavok

- id:        9
  popis:     Nastavenie Zberu informacii o faktoroch ...
- id:        10
  popis:     Prehlad o nadrziach 
- id:        11
  popis:     Zobrazenie operativneho prehladu nadrzi
Activities:
- 1 
- 2 3 4 5
- 6 7 8 9 10 11
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
    let yaml = event.target.value;
    let doc, digraph;
    try {
      doc = YAML.parse(yaml);
      digraph = '';
      digraph += "digraph di {\nsize=\"6.4,6.4\";\n\tnode[shape=record]\n";
      doc.Requests.forEach(element => {
        digraph += "\tprocId" + element.id + ' [label="{<f0> '+element.id+
          ' |<f1> '+element.popis+
          ' }"  shape=Mrecord];'+
          "\n"
        ;
      });

      doc.Activities.forEach(element => {
        let strArray = String(element).split(' ');
        let string = strArray.map( (element) => { return "procId"+element } ).join(' -> ');
        digraph += "\t" + string + "\n";
      });

      digraph += "\n}";
    } catch (e) {
      console.log(e);
    }

    this.setState({
      ...this.state,
      dgValue: digraph,
      ymValue: yaml
    });
  };

  render () {
      return (
      <div className="App">
        <header className="App-header">
          <textarea id="yaml_data" rows="15" cols="80" width="100%" wrap="off" value={this.state.ymValue}
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
