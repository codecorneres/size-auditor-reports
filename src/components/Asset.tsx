import 'react-bootstrap/dist/react-bootstrap';
import * as React from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
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
            ],
            
        };
        this.getRepositoryList = this.getRepositoryList.bind(this);
    }
    componentDidMount()
	{
        this.getRepositoryList(this);
        console.log(this.state.tableData);
        const newFile = this.state.tableData.map((repository: any, index: number) => {

            return { Serial: index+1,...repository};
        });
        this.setState({tableData: newFile });
    }
    getRepositoryList(that: any)
	{
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
               // console.log(response.data);
				// that.setState({tableData: response.data});
			})
			.catch(function (error) {
			console.log(error);
		});
	}
    render(): JSX.Element { 
            const data = {
              columns: [
                {
                  label: 'Serial',
                  field: 'Serial',
                  sort: 'asc',
                  width: 150
                },
                {
                  label: 'Asset',
                  field: 'Asset',
                  sort: 'asc',
                  width: 270
                },
                {
                  label: 'Size Difference',
                  field: 'Size Difference',
                  sort: 'asc',
                  width: 200
                }
              ],
              rows: this.state.tableData
        }
        return (
            <div className="Apps">
                <MDBDataTable
                striped
                bordered
                hover
                data={data}
                />
            </div>
        );
    }
}

export default Asset;