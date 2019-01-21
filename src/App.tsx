import * as React from 'react';
import { Router, Route,Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import { initializeIcons } from '@uifabric/icons';
import Home from './components/Home';
import Landing from './components/Landing';
import Module from './components/Module';
import Asset from './components/Asset';
import Pyramid from './components/Pyramid';
import AssetsValue from './components/AssetsValue';
class App extends React.Component<any, any>  {
 public render(): JSX.Element {
  initializeIcons();
    const history = createBrowserHistory();
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/landing' component={Landing} />
            <Route exact path='/Module' component={Module} />
            <Route exact path='/Assets' component={Asset} />
            <Route exact path='/Pyramid' component={Pyramid} />
            <Route exact path='/Assets/:name' component={AssetsValue} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
