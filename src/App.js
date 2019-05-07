import React, {Component} from 'react';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';

class App extends Component {

  render() {
    return (
      <div>
        <TopNav />
        <Dashboard />
      </div>
    )
  }
}

export default App;
