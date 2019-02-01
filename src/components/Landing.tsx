import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
// import { jsonResponse } from './../upload/AssetsData';
// import { jsonModuleResponse } from './../upload/moduleData';
import { Link } from 'office-ui-fabric-react/lib/Link';
import Layout from './../Layout';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import axios from 'axios';

let _items: IDocument[] = [];
let currentFive: IDocument[] = [];
let _items2: IDocument[] = [];
let currentFive2: IDocument[] = [];

export interface IDetailsListDocumentsExampleState {
    columns: IColumn[];
    items: IDocument[];
    columns2: IColumn[];
    items2: IDocument[];
    isModalSelection: boolean;
    isCompactMode: boolean;
    currentPage: number;
    todosPerPage: number;
    showResults: boolean;
    showResults2: boolean;
}

export interface IDocument {
  [key: string]: any;
  serial: number;
  asset: string;
  sizeDifference: string;
  module: string;
  assetsImpactedCount: string;
  assetsImpactedNames:  string;
}
class Landing extends React.Component<any, IDetailsListDocumentsExampleState>  {
  private _selection: Selection;
    constructor(props: any) {
      super(props);
      const _columns: IColumn[] = [{
        key: 'column1',
        name: 'Serial',
        fieldName: 'serial',
        minWidth: 100,
        maxWidth: 120,
        isResizable: true,
       // onColumnClick: this._onColumnClick,
        data: 'number',
        onRender: (item: IDocument) => {
          return <span>{item.serial}</span>;
        },
        isPadded: true
      },
      {
        key: 'column2',
        name: 'Asset',
        fieldName: 'asset',
        minWidth: 300,
        maxWidth: 320,
        isResizable: true,
        // onColumnClick: this._onColumnClick,
        data: 'string',
        onRender: (item: IDocument) => {
          return  <Link href={`/Assets/${item.asset}`} title={item.asset}>{item.asset}</Link>;
        },
        isPadded: true
      },
      {
        key: 'column3',
        name: 'Size Difference',
        fieldName: 'sizeDifference',
        minWidth: 100,
        maxWidth: 120,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        // onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span title={item.sizeDifference}>{item.sizeDifference}</span>;
        },
        isPadded: true
      },
      {
        key: 'column4',
        name: 'Action',
        fieldName: 'Action',
        minWidth: 100,
        maxWidth: 120,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
       // onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <PrimaryButton data-automation-id="test" text="Submit" onClick={(ev) => { this.primarybuttonclick(item.asset) }} />;
        },
        isPadded: true
      }];
      const _columns2: IColumn[] = [
        {
          key: 'column1',
          name: 'Serial',
          fieldName: 'serial',
          minWidth: 50,
          maxWidth: 70,
          isResizable: true,
         // onColumnClick: this._onColumnClick,
          data: 'number',
          onRender: (item: IDocument) => {
            return <span>{item.serial}</span>;
          },
          isPadded: true
        },
        {
          key: 'column2',
          name: 'Module',
          fieldName: 'module',
          minWidth: 150,
          maxWidth: 170,
          isResizable: true,
         // onColumnClick: this._onColumnClick,
          data: 'string',
          onRender: (item: IDocument) => {
            return <span title={item.module}>{item.module}</span>;
          },
          isPadded: true
        },
        {
          key: 'column3',
          name: 'Size Difference',
          fieldName: 'sizeDifference',
          minWidth: 70,
          maxWidth: 90,
          isCollapsible: true,
          data: 'string',
         // onColumnClick: this._onColumnClick,
          onRender: (item: IDocument) => {
            return <span title={item.sizeDifference}>{item.sizeDifference}</span>;
          },
          isPadded: true
        },
        {
            key: 'column4',
            name: 'Assets Affected',
            fieldName: 'assetsImpactedCount',
            minWidth: 50,
            maxWidth: 70,
            isResizable: true,
            isCollapsible: true,
            data: 'number',
            // onColumnClick: this._onColumnClick,
            onRender: (item: IDocument) => {
              return <span title={item.assetsImpactedCount}>{item.assetsImpactedCount}</span>;
            },
            isPadded: true
          },
          {
            key: 'column5',
            name: 'Asset Names',
            fieldName: 'assetsImpactedNames',
            minWidth: 200,
            maxWidth: 220,
            isResizable: true,
            isCollapsible: true,
            data: 'string[]',
            // onColumnClick: this._onColumnClick,
            onRender: (item: IDocument) => {
              return <span title={item.assetsImpactedNames}>{item.assetsImpactedNames}</span>;
            },
            isPadded: true
          }
        ];
    
      this.state = {
      items: _items,
      columns: _columns,
      items2: _items2,
      columns2: _columns2,
      isModalSelection: true,
      isCompactMode: false,
      currentPage: 1,
      todosPerPage: 5,
      showResults: false,
      showResults2: false
      };
    }
    public primarybuttonclick(ev: any): void {
      const data = {'asset': ev};
      if (data){
        axios.post('http://localhost:8000/assetsbutton',data)
        .then(function (response) { 
          console.log(response);
        });
      }  
    }
    public componentDidMount()
    {
        this.getRepositoryAssetsList(this);
        this.getRepositoryModuleList(this);
    }
    public async getRepositoryAssetsList(that: any)
    {
      let tabledata: any =  [];
      await axios.get('http://localhost:8000/AssetsData')
        .then(function (response) {
        // console.log(response);
        tabledata = response.data;
        if (_items.length === 0) {
          _items.push()
          const newFile = tabledata.map((repository: any, index: number) => {
            return { serial: index+1,...repository};
          });
          _items = newFile;
          const indexOfLastTodo = that.state.currentPage * that.state.todosPerPage;
          const indexOfFirstTodo = indexOfLastTodo - that.state.todosPerPage;
          currentFive = _items.slice(indexOfFirstTodo, indexOfLastTodo); 
        }
        that.setState({items: currentFive}); 
      });  
    }
    public  async getRepositoryModuleList(that: any){
      let tabledata2: any =  [];
     await axios.get('http://localhost:8000/modulesData')
        .then(function (response) {
        // console.log(response);
        tabledata2 = response.data;
        if (_items2.length === 0) {
          _items2.push()
          const newFile = tabledata2.map((repository: any, index: number) => {
          return { serial: index+1,...repository};
          });
          _items2 = newFile;
          const indexOfLastTodo = that.state.currentPage * that.state.todosPerPage;
          const indexOfFirstTodo = indexOfLastTodo - that.state.todosPerPage;
          currentFive2 = _items2.slice(indexOfFirstTodo, indexOfLastTodo);
      } 
      that.setState({items2: currentFive2}); 
      });
    }
   /* public getRepositoryList3(that: any)
    {
      if (_items2.length === 0) {
          _items2.push()
          const newFile = modules.map((repository: any, index: number) => {
          return { serial: index+1,...repository};
          });
          _items2 = newFile;

          const indexOfLastTodo = that.state.currentPage * that.state.todosPerPage;
          const indexOfFirstTodo = indexOfLastTodo - that.state.todosPerPage;
          currentFive = _items2.slice(indexOfFirstTodo, indexOfLastTodo);
      } 
     that.setState({items2: currentFive}); 
    }
    public getRepositoryList4(that: any)
    {  
      const tabledata = asset;
      if (_items.length === 0) {
          _items.push()
          const newFile = tabledata.map((repository: any, index: number) => {
          return { serial: index+1,...repository};
          });
          _items = newFile;
          const indexOfLastTodo = that.state.currentPage * that.state.todosPerPage;
          const indexOfFirstTodo = indexOfLastTodo - that.state.todosPerPage;
          currentFive2 = _items.slice(indexOfFirstTodo, indexOfLastTodo);
      } 
     that.setState({items: currentFive2}); 
    }*/
    public render(): JSX.Element {
      const { columns,columns2, isCompactMode, items, items2, isModalSelection} = this.state;
      return (
        <div>
          <Layout />
          <div className="ms-Grid-row bdy">
            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg2" />
            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg8">
            <div className="Apps">
                <div className="section1">  
                <MarqueeSelection selection={this._selection}>
                <DetailsList
                    items={items2}
                    compact={isCompactMode}
                    columns={columns2}
                    selectionMode={isModalSelection ? SelectionMode.multiple : SelectionMode.none}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    selection={this._selection}
                    selectionPreservedOnEmptyClick={true}
                    enterModalSelectionOnTouch={true}
                />
                </MarqueeSelection>
                <Link href="/Module">Show More</Link>
                </div>
                <div className="section2"> 
                    <MarqueeSelection selection={this._selection}>
                    <DetailsList
                        items={items}
                        compact={isCompactMode}
                        columns={columns}
                        selectionMode={isModalSelection ? SelectionMode.multiple : SelectionMode.none}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                        enterModalSelectionOnTouch={true}
                        data-is-scrollable={true}
                    />
                    </MarqueeSelection>
                    <Link href="/Assets">Show More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
  public componentDidUpdate(previousProps: any, previousState: IDetailsListDocumentsExampleState) {
      if (previousState.isModalSelection !== this.state.isModalSelection) {
          if (!this.state.isModalSelection) {
          this._selection.setAllSelected(false);
          }
      }
  } 
}        
export default Landing;