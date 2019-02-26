import * as React from 'react';
// import { Redirect} from "react-router-dom";
import axios from 'axios';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
// import Layout from './../Layout';
// import {  PrimaryButton } from 'office-ui-fabric-react/lib/Button';
class ExpressFileUpload extends React.Component<any, any>  {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedFile: 'Assets Data',
      selectedFile2: 'Modules Data',
      firstinput: '',
      secondinput: '',
    };
    this.handleselectedFile = this.handleselectedFile.bind(this);
    this.handleselectedFile2 = this.handleselectedFile2.bind(this);
   // this.handleUpload = this.handleUpload.bind(this);
  }
  public componentDidMount()
  {
    //
  }
  public handleselectedFile(event: any){
    this.setState({
      selectedFile: event.target.files[0].name,
    })
    const data = new FormData();
    data.append('file', event.target.files[0], event.target.files[0].name);
    axios.post('/ExpressAsset',data)
    .then(function (response) {
     console.log(response);
    });
  }
  public handleselectedFile2(event: any){
    this.setState({
      selectedFile2: event.target.files[0].name,
    })
    const data = new FormData();
    data.append('file2', event.target.files[0],event.target.files[0].name);
    axios.post('/Expressmodules',data)
        .then(function (response) {
         console.log(response);
      });
  }
  // public handleUpload(){
  //   // const that = this;
  //   const data = new FormData()
  //   // const data2 = new FormData();
  //   data.append('file', this.state.selectedFile, this.state.selectedFile.name);
  //   data.append('file2', this.state.selectedFile2,this.state.selectedFile2.name);
  //   if(this.state.selectedFile.name && this.state.selectedFile2.name !== ''){
  //     axios.post('/ExpressAsset',data)
  //     .then(function (response) {
  //      console.log(response);
  //      // that.setState({ shouldRedirect: true });
  //     });
  //    /* axios.post('http://localhost:8000/Expressmodules',data2)
  //       .then(function (response) {
  //       // console.log(response);
  //     });*/
  //   } 
  // }
  public render(): JSX.Element {
    const {selectedFile, selectedFile2} = this.state;
    return (
      <div className="flex-direction">
        <header className="header">
          <h3 className="h3cl">Webpack Size Auditor</h3>
        </header>
        <div className="Grid--cols-2 bdy">
          <div className="flex-cell">
            <div className="Apps fileuploaddiv">
              <b>BASELINE</b>
              <h2>{selectedFile}</h2>
              <input type="file" name="file" className="inputfile" onChange={this.handleselectedFile}/>
            </div><span className="spandv"><Icon iconName="ChromeBackMirrored" className="ms-IconExample" /></span>
          </div>
          <div className="flex-cell">
            <div className=" Apps fileuploaddiv dv2">
            <b>CHANGED</b>
              <h2>{selectedFile2}</h2>
              <input type="file" name="file2" className="inputfile" onChange={this.handleselectedFile2}/>
            </div>
            {/* <div className="fileuploadbtndv">
              <PrimaryButton
                data-automation-id="test"
                text="Submit"
                onClick={this.handleUpload}
                allowDisabledFocus={true}
              />
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ExpressFileUpload;