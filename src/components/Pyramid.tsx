import * as React from 'react';
import Layout from './../Layout';
class Pyramid extends React.Component<any, any>  {
    public render(): JSX.Element {
        return (
            <div>
                <Layout />
                <div className="ms-Grid-row bdy">
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg2" />
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg8">
                        <div className="Apps">
                            <p>On Working</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pyramid;