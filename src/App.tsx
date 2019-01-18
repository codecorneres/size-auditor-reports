import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Router, Route,Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import { initializeIcons } from '@uifabric/icons';
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
      <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row navrow">
            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg3 headr"><h3><Link href="/">Size Auditor Report</Link></h3></div>
            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg9">
              <Nav
                groups={[
                  {
                    links: [
                      { name: 'Module View', key: 'Module View', url: '/Module' },
                      { name: 'Asset View', key: 'Asset View', url: '/Assets' },
                      { name: 'Pyramid view', key: 'Pyramid view', url: '/Pyramid' }
                    ]
                  }
                ]}
              />
            </div>
          </div>
          <div className="ms-Grid-row bdy">
            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg2" />
            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg8">
              <Router history={history}>
                <Switch>
                <Route exact path='/' component={Landing} />
                  <Route exact path='/Module' component={Module} />
                  <Route exact path='/Assets' component={Asset} />
                  <Route exact path='/Pyramid' component={Pyramid} />
                  <Route exact path='/Assets/:name' component={AssetsValue} />
                </Switch>
              </Router>
            </div> 
            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg2" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
