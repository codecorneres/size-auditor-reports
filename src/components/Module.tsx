import 'react-bootstrap/dist/react-bootstrap';
import * as React from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';

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
    }
    
    getRepositoryList(that: any)
	{
		/*axios.get("https://jsonplaceholder.typicode.com/posts").then(response =>{
			var data = [];
			console.log("Data:",data);
        });*/
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
        return (
            <div>
               <Table bordered responsive className="df">
					<thead>
						<tr>
							<th>Serial</th>
							<th>Module</th>
							<th>Size Difference</th>
							<th>Assets Affecteed</th>
                            <th>Asset Names</th>
						</tr>
					</thead>
					<tbody>
					{
						this.state.tableData.map(function(repository: any, index: number){
							return <tr key={index}><td>{index+1}</td><td >{repository.module}</td><td>{repository.sizeDifference}</td><td>{repository.assetsImpactedCount}</td><td><table><tbody><tr>
                                {
                                    repository.assetsImpactedNames.map(function(lfive: any, ind: number){
                                        return <td key={ind}>{lfive},</td>
                                    })
                                }
                            </tr></tbody></table></td></tr>;
						})
					}	
					</tbody>
				 </Table>
            </div>
        );
    }
}

export default Module;