import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Cakes from '../Cakes';
import Cake from '../Cake';
import New from '../New';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { cakes: [] };
  }

  render() {
    return (
      <Router>
        <div>
          <div
            style={{
              position: 'fixed',
              width: '100%',
              backgroundColor: '#fff',
              top: '0',
              zIndex: '10',
            }}
          >
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/new">New</Link>
              </li>
            </ul>
            <hr style={{ margin: '0' }} />
          </div>

          <Route exact path="/" component={Cakes} />
          <Route exact path="/cake/:id" component={Cake} />
          <Route exact path="/new" component={New} />
        </div>
      </Router>
    );
  }
}

export default App;
