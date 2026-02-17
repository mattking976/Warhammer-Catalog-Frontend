import React from 'react';
import axios from 'axios';

import ListComponent from './components/listcomponent';
import { parseUnits, Unit } from './helpers/unitParsers';
import { API_ENDPOINTS } from './helpers/endpoints';
import './CSS/exports';

type State = {
  data: Unit[] | null;
};

class App extends React.Component<{}, State> {
  state: State = { data: null };

  componentDidMount() {
    axios.get(API_ENDPOINTS.FORCE_ORG)
      .then(response => {
        // response.data may already be a parsed object or a JSON string
        const parsed = parseUnits(response.data);
        this.setState({ data: parsed });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({ data: [] });
      });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <h1>Blood Angels Forces</h1>
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
