import 'react-bootstrap/dist/react-bootstrap';
import * as React from 'react';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import RBCarousel from "react-bootstrap-carousel";
import axios from 'axios';
import {  PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Redirect} from "react-router-dom";
const styles = { height: 400, width: "100%" };
const stylerow = { display: "inline-flex" };
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import Layout from './../Layout';

class Carousel extends React.Component<any, any>  {
  constructor(props: any) {
    super(props);
    this.state = {
      autoplay: false,
      dragfile: [],
      selectedFile: [],
      selectedFile2: [],
      selectedFile3: [],
      firstinput: '',
      secondinput: '',
      thirdinput: '',
      shouldRedirect: false,
      Afilename: '',
      Mfiles: '',
      Afiles2: '',

    };
    this.handleonDrop3 = this.handleonDrop3.bind(this);
    this.handleonDrop = this.handleonDrop.bind(this);
    this.handleonDrop2 = this.handleonDrop2.bind(this);
    this._alertClicked = this._alertClicked.bind(this);
    this._alertClicked2 = this._alertClicked2.bind(this);
    this._alertClicked3 = this._alertClicked3.bind(this);
  }
  public componentDidMount()
  {
    localStorage.removeItem('asset');
    localStorage.removeItem('module');
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
        <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg8 Apps">
        
        <Row>
          <Col span={12} style={{ marginTop: 20 }}>
            <RBCarousel className="carousel-fade" autoplay={this.state.autoplay}>
              <div style={{ ...styles, backgroundColor: "#fff" }}>
                <div className="carousel-center" style={{...stylerow}}>
                  <span className="spn">
                  <Dropzone onDrop={this.handleonDrop}>{({getRootProps, getInputProps, isDragActive}) => {
                      return (
                        <div
                          {...getRootProps()}
                          className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                        >
                          <input {...getInputProps()} />
                          {
                            isDragActive ?
                              <p>Drop files here...</p> :
                              <p>Try dropping Asset Data file here, or click to select files to upload.</p>
                          }
                        </div>
                      )
                    }}</Dropzone>
                    <p className="filename">{this.state.Afilename}</p>
                  </span>
                  <span className="spn">
                  <Dropzone onDrop={this.handleonDrop2}>{({getRootProps, getInputProps, isDragActive}) => {
                      return (
                        <div
                          {...getRootProps()}
                          className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                        >
                          <input {...getInputProps()} />
                          {
                            isDragActive ?
                              <p>Drop files here...</p> :
                              <p>Try dropping module Data file here, or click to select files to upload.</p>
                          }
                        </div>
                      )
                    }}</Dropzone>
                    <p className="filename">{this.state.Mfiles}</p>
                   </span>
                </div>
                <div className="carousel-caption">
                  <PrimaryButton
                    data-automation-id="test"
                    text="Submit"
                    onClick={this._alertClicked}
                    allowDisabledFocus={true}
                  />
                </div>
              </div>
              <div style={{ ...styles, backgroundColor: "#fff" }}>
                <div className="carousel-center" style={{...stylerow}}>
                <span className="spnd">
                
                <Dropzone onDrop={this.handleonDrop3}>{({getRootProps, getInputProps, isDragActive}) => {
                      return (
                        <div
                          {...getRootProps()}
                          className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                        >
                          <input {...getInputProps()} />
                          {
                            isDragActive ?
                              <p>Drop files here...</p> :
                              <p>Try dropping Asset Data file here, or click to select files to upload.</p>
                          }
                        </div>
                      )
                    }}</Dropzone>
                    <p className="filename">{this.state.Afiles}</p>
                 </span>
                <span><TextField placeholder="Enter build Id" label="" onChange={(e) => this._onChangeText(e.target)} className="docs-TextFieldExample"/></span>
                  
                </div>
                <div className="carousel-caption">
                  <PrimaryButton
                    data-automation-id="test"
                    text="Submit"
                    onClick={this._alertClicked2}
                    allowDisabledFocus={true}
                  />
                </div>
              </div>
              <div style={{ ...styles, backgroundColor: "#fff" }}>
                <div className="carousel-center" style={{...stylerow}}>
                <span><TextField placeholder="Enter build Id" label="" onChange={(e) => this._onChangeText1(e.target)} className="docs-TextFieldExample"/></span>
                <span><TextField placeholder="Enter build Id" label="" onChange={(e) => this._onChangeText2(e.target)} className="docs-TextFieldExample"/></span>
                  
                </div>
                <div className="carousel-caption">
                  <PrimaryButton
                    data-automation-id="test"
                    text="Submit"
                    onClick={this._alertClicked3}
                    allowDisabledFocus={true}
                  />
                </div>
              </div>
            </RBCarousel>
          </Col>
        </Row>
      </div>
      </div>
      }
      </div>
    );
  }
  private handleonDrop = (files: any) =>{
    this.setState({
      selectedFile: files[0],
      Afilename: files[0].name,
    })
  }
  private handleonDrop2 = (files: any) =>{
    this.setState({
      selectedFile2: files[0],
      Mfiles: files[0].name,
    })
  }
  private handleonDrop3 = (files: any) =>{
    this.setState({
      selectedFile3: files[0],
      Afiles: files[0].name,
    })
  }
 

  private _alertClicked(): void {
    const data = new FormData();
    const data2 = new FormData();
    if(this.state.selectedFile.name && this.state.selectedFile2 !== '')
    {
      data.append('file', this.state.selectedFile, this.state.selectedFile.name);
      data2.append('file', this.state.selectedFile2, this.state.selectedFile2.name);
      axios.post('/Asset',data)
      .then(function (response) { 
        // console.log(response);
      });
      axios.post('/modules',data2)
      .then(function (response) {  
        // console.log(response);
      });
      this.setState({ shouldRedirect: true });
    }
  }
  private _alertClicked2(): void {
    const data = new FormData();
    if(this.state.firstinput !==''  && this.state.selectedFile3.name !== undefined)
    {
      
      data.append('file', this.state.selectedFile3, this.state.selectedFile3.name);
      data.append('modules', this.state.firstinput);
       const that = this;
      axios.post('/Asset',data)
      .then(function (response) {
        axios.post('/saveFile',{'modules':that.state.firstinput}).then(function (resp: any) {
           localStorage.setItem('module', JSON.stringify(resp.data));
           that.setState({ shouldRedirect: true });
        });
       
      });
    }
  }
  private _alertClicked3(): void {
    if(this.state.secondinput && this.state.thirdinput !== '')
    {
      const that = this;
      axios.post('/saveAssetFile',{'asset':this.state.secondinput}).then(function (response: any) {

        localStorage.setItem('asset', JSON.stringify(response.data));
      });
      axios.post('/saveFile',{'modules':this.state.thirdinput}).then(function (response: any) {
        localStorage.setItem('module', JSON.stringify(response.data));
        that.setState({ shouldRedirect: true });
      });
    }
  }
 
  private _onChangeText(selectorFiles: any): void{
    this.setState({
      firstinput: selectorFiles.value, 
    });
  }
  private _onChangeText1(selectorFiles: any): void{
    this.setState({
      secondinput: selectorFiles.value,
    });
  }
  private _onChangeText2(selectorFiles: any): void{
    this.setState({
      thirdinput: selectorFiles.value,
    });
  }
}
const Row = (props: any) => <div className="row">{props.children}</div>;
const Col = (props: any) => (
  <div className={`col-xs-${props.span}`} style={props.style}>
    {props.children}
  </div>
);
export default Carousel;
