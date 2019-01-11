import 'react-bootstrap/dist/react-bootstrap';
import * as React from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
class Asset extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            tableData: [
                {
                    asset: "asset1",
                    sizeDifference: "+100"
                },
                {
                    asset: "asset2",
                    sizeDifference: "+50"
                }
            ]
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
                asset: "asset1",
                sizeDifference: "+100"
            },
            {
                asset: "asset2",
                sizeDifference: "+50"
            }
        ])
			.then(function (response) {
                console.log(response.data);
				// that.setState({tableData: response.data});
			})
			.catch(function (error) {
			console.log(error);
		});
	}
    render(): JSX.Element {
        console.log(this.state.tableData)
        return (
            <div>
               <Table striped bordered condensed hover responsive className="text-left ">
					<thead>
						<tr>
							<th>Serial</th>
							<th>Asset</th>
							<th>Size Difference</th>
						</tr>
					</thead>
					<tbody>
					{
						this.state.tableData.map(function(repository: any, index: number){
							return <tr key={index}><td>{index+1}</td><td >{repository.asset}</td><td>{repository.sizeDifference}</td></tr>;
						})
					}
					</tbody>
				 </Table>
            </div>
        );
    }
}

export default Asset;