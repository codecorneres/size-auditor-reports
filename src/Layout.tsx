import * as React from 'react';
// import { Link } from 'office-ui-fabric-react/lib/Link';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
// import { createBrowserHistory } from 'history';
// import { IconButton } from 'office-ui-fabric-react/lib/Button';
// const BrowserHistory = createBrowserHistory();
class Layout extends React.Component<any, any>  {
  
    public render(): JSX.Element {
      return (
        <div className="flex">
          <div className="flex-direction navrow">
          <h5 className="h3cl"><b>RESULTS</b></h5>
            <div className="flex-container">
              <Nav
                groups={[
                  {
                    links: [
                      { name: 'Overview', key: 'Overview', url: '/' },
                      { name: 'Bundles', key: 'Asset View', url: '/Assets' },
                      { name: 'Modules', key: 'Module View', url: '/Module' }
                      
                      // { name: 'Pyramid view', key: 'Pyramid view', url: '/Pyramid' },
                      // { name: 'Feedback', key: 'Feedback', url: '/Feedback' }
                    ]
                  }
                ]}
              />
            </div>
          </div>
          {/* <div className="flex-container bckrw"> 
            <div className="col-md-12">
              <Link onClick={() => {BrowserHistory.goBack() }} > 
                <IconButton iconProps={{ iconName: 'Back' }} title="Back" ariaLabel="Back" />
                <span> Go Back</span>
              </Link> 
            </div>
          </div> */}
        </div> 
      );
    }
}

export default Layout;