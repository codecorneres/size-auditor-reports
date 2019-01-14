import 'react-bootstrap/dist/react-bootstrap';
import * as React from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

class Module extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            tableData: [
                {
                    "module":"module1.js",
                    "sizeDifference":"+100",
                    "assetsImpactedCount":3,
                    "assetsImpactedNames":[
                        "asset1",
                        "asset2",
                        "asset3"
                    ]
                },
                    {
                    "module":"module2.js",
                    "sizeDifference":"+50",
                    "assetsImpactedCount":3,
                    "assetsImpactedNames":[
                        "asset4",
                        "asset5"
                    ]
                }
            ],
        };
        this.getRepositoryList = this.getRepositoryList.bind(this);
    }
    componentDidMount()
	{
        this.getRepositoryList(this);
        const newFile = this.state.tableData.map((repository: any, index: number) => {
            return { Serial: index+1,...repository};
        });
        this.setState({tableData: newFile });
        console.log(this.state.tableData);
    }
    
    getRepositoryList(that: any)
	{
		axios.post('https://jsonplaceholder.typicode.com/posts',[
            {
                "module":"module1.js",
                "sizeDifference":"+100",
                "assetsImpactedCount":3,
                "assetsImpactedNames":[
                    "asset1",
                    "asset2",
                    "asset3"
                ]
            },
                {
                "module":"module2.js",
                "sizeDifference":"+50",
                "assetsImpactedCount":3,
                "assetsImpactedNames":[
                    "asset4",
                    "asset5"
                ]
            }
        ])
		.then(function (response) {
            // that.setState({tableData: response.data});
		})
		.catch(function (error) {
			console.log(error);
		});
	}
    render(): JSX.Element {
        /*this.state.tableData.sort(function(a: any,b: any){
            return (a.sizeDifference) - (b.sizeDifference);
        });*/
        const data = {
            columns: [
              {
                label: 'Serial',
                field: 'Serial',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Module',
                field: 'Module',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Size Difference',
                field: 'Size Difference',
                sort: 'asc',
                width: 200
              },
              {
                label: 'Assets Affecteed',
                field: 'Assets Affecteed',
                sort: 'asc',
                width: 200
              },
              {
                label: 'Asset Names',
                field: 'Asset Names',
                sort: 'asc',
                width: 200
              },
            ],
            rows: this.state.tableData
        }
        return (
            <div className="Apps">
              <MDBDataTable
                striped
                bordered
                small
                data={data}
                />
            </div>
        );
    }
}

export default Module;