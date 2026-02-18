import React from 'react';

import ListComponent from './components/listcomponent';
import getForces from './helpers/getForces';
import { Unit } from './helpers/dataTypes';
import './CSS/app.css';

type State = {
  data: Unit[] | null;
  force: string;
};

class App extends React.Component<{}, State> {
  state: State = { data: null, force: '2/' };
  componentDidMount() {
    getForces(this.state.force)
  }

  render() {
    const { data } = this.state;
    const heading = data && data.length > 0 ? data[0].faction || 'Force Org Data' : 'Force Org Data';

    return (
      <div className="App">
        <h1>{heading} Forces</h1>

        <select defaultValue={"2/"} onChange={(e) => {
          this.setState({ force: e.target.value });
          getForces(e.target.value).then((data) => this.setState({ data }));
        }}>
          <option value="2/">Necrons</option>
          <option value="6/">Blood Angels</option>
        </select>
        
        {data && data.length > 0 ? (
          <div>
            <ListComponent units={data} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;
