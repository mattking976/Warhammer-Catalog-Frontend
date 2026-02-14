import React from 'react';
import axios from 'axios';

import ListComponent from './components/listcomponent';

class App extends React.Component {
  state = {
    data: null,
  };

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/')
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    const { data } = this.state;
    const parsedData = data ? JSON.parse(data) : null;

    return (
      <div>
        <h1>Data from API:</h1>
        {parsedData ? (
          // this does not function
          <ListComponent
            unitName={parsedData.unitName}
            unitType={parsedData.unitType}
            codexPage={parsedData.codexPage}
            pointsCost={parsedData.pointsCost}
            isBuilt={parsedData.isBuilt}
            isPainted={parsedData.isPainted}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;
