import * as React from 'react';
import { Redirect} from "react-router-dom";
import axios from 'axios';
import Layout from './../Layout';
import {  PrimaryButton } from 'office-ui-fabric-react/lib/Button';
class ExpressFileUpload extends React.Component<any, any>  {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedFile: [],
      selectedFile2: [],
      firstinput: '',
      secondinput: '',
      shouldRedirect: false,
    };
    this.handleselectedFile = this.handleselectedFile.bind(this);
    this.handleselectedFile2 = this.handleselectedFile2.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  public componentDidMount()
  {
    //
  }
  public handleselectedFile(event: any){
    this.setState({
      selectedFile: event.target.files[0],
    })
  }
  public handleselectedFile2(event: any){
    this.setState({
      selectedFile2: event.target.files[0],
    })
  }
  public handleUpload(){
    const data = new FormData()
    const data2 = new FormData();
    data.append('file', this.state.selectedFile, this.state.selectedFile.name);
    data2.append('file', this.state.selectedFile2,this.state.selectedFile2.name);
    if(this.state.selectedFile.name && this.state.selectedFile2.name !== ''){
      axios.post('/ExpressAsset',data)
      .then(function (response) {
      // console.log(response);
      });
      axios.post('/Expressmodules',data2)
        .then(function (response) {
        // console.log(response);
      });
      this.setState({ shouldRedirect: true });
    }
    
  }
  public render(): JSX.Element {
    return (
      <div className="container-fluid">
      <Layout />
      {
      this.state.shouldRedirect ?
        <Redirect to="/" push/> :
        <div className="ms-Grid-row bdy">
          <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg2" />
          <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg8 Apps fileuploaddiv">
            <div className="inlinfields">
              <input type="file" name="file" className="" onChange={this.handleselectedFile}/>
              <input type="file" name="" className="" onChange={this.handleselectedFile2}/>
            </div>
            <div className="fileuploadbtndv">
              <PrimaryButton
                data-automation-id="test"
                text="Submit"
                onClick={this.handleUpload}
                allowDisabledFocus={true}
              />
            </div>
          </div>
        </div>
      }
      </div>
    );
  }
}

export default ExpressFileUpload;