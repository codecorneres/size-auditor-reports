import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
class Layout extends React.Component<any, any>  {
    public render(): JSX.Element {
      return (
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-row navrow">
            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg3 headr"><h3><Link href="/">Size Auditor Report</Link></h3></div>
              <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg9">
                <Nav
                  groups={[
                    {
                      links: [
                        { name: 'Module View', key: 'Module View', url: '/Module' },
                        { name: 'Asset View', key: 'Asset View', url: '/Assets' },
                        { name: 'Pyramid view', key: 'Pyramid view', url: '/Pyramid' },
                        { name: 'Feedback', key: 'Feedback', url: '/Feedback' }
                      ]
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default Layout;