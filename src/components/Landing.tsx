import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { jsonResponse } from './../upload/AssetsData';
import { jsonModuleResponse } from './../upload/moduleData';
import { Link } from 'office-ui-fabric-react/lib/Link';
import axios from 'axios';
import Layout from './../Layout';
let _items: IDocument[] = [];
let currentFive: IDocument[] = [];
let _items2: IDocument[] = [];
let currentFive2: IDocument[] = [];
let modules: any =  null;
let asset: any = null;
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
  assetsImpactedCount: number;
  assetsImpactedNames:  string[];
}
class Landing extends React.Component<any, IDetailsListDocumentsExampleState>  {
    private _selection: Selection;
    constructor(props: any) {
      super(props);
      const _columns: IColumn[] = [{
        key: 'column1',
        name: 'Serial',
        fieldName: 'serial',
        minWidth: 200,
        maxWidth: 220,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
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
        minWidth: 200,
        maxWidth: 220,
        isResizable: true,
        // onColumnClick: this._onColumnClick,
        data: 'string',
        onRender: (item: IDocument) => {
          return  <Link href={`/Assets/${item.asset}`}>{item.asset}</Link>;
        },
        isPadded: true
      },
      {
        key: 'column3',
        name: 'Size Difference',
        fieldName: 'sizeDifference',
        minWidth: 200,
        maxWidth: 220,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        // onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.sizeDifference}</span>;
        },
        isPadded: true
      }];
      const _columns2: IColumn[] = [
        {
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
          name: 'Module',
          fieldName: 'module',
          minWidth: 100,
          maxWidth: 120,
          isResizable: true,
         // onColumnClick: this._onColumnClick,
          data: 'string',
          onRender: (item: IDocument) => {
            return <span>{item.module}</span>;
          },
          isPadded: true
        },
        {
          key: 'column3',
          name: 'Size Difference',
          fieldName: 'sizeDifference',
          minWidth: 100,
          maxWidth: 120,
          isCollapsible: true,
          data: 'string',
         // onColumnClick: this._onColumnClick,
          onRender: (item: IDocument) => {
            return <span>{item.sizeDifference}</span>;
          },
          isPadded: true
        },
        {
            key: 'column4',
            name: 'Assets Affected',
            fieldName: 'assetsImpactedCount',
            minWidth: 100,
            maxWidth: 120,
            isResizable: true,
            isCollapsible: true,
            data: 'number',
            // onColumnClick: this._onColumnClick,
            onRender: (item: IDocument) => {
              return <span>{item.assetsImpactedCount}</span>;
            },
            isPadded: true
          },
          {
            key: 'column5',
            name: 'Asset Names',
            fieldName: 'assetsImpactedNames',
            minWidth: 100,
            maxWidth: 120,
            isResizable: true,
            isCollapsible: true,
            data: 'string[]',
            // onColumnClick: this._onColumnClick,
            onRender: (item: IDocument) => {
              return <span>{item.assetsImpactedNames+','}</span>;
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
    public componentDidMount()
    {
      modules = sessionStorage.getItem('module');
      asset = sessionStorage.getItem('asset');
      if(modules ==null && asset==null){
        this.getRepositoryList(this);
        this.getRepositoryList2(this);
      }
      else if (asset==null && modules !=null){
        this.getRepositoryList3(this);
        this.getRepositoryList2(this);
      }
      else{
        this.getRepositoryList3(this);
        this.getRepositoryList4(this);
      }
      
    }
    public getRepositoryList(that: any)
    {
      const tabledata = jsonResponse.data.tabledata;
      if (_items.length === 0) {
        _items.push()
        const newFile = tabledata.map((repository: any, index: number) => {
          return { serial: index+1,...repository};
        });
        _items = newFile;
        // _items = that._sortItems(_items, 'Serial');
        const indexOfLastTodo = that.state.currentPage * that.state.todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - that.state.todosPerPage;
        currentFive = _items.slice(indexOfFirstTodo, indexOfLastTodo);
      }
      that.setState({items: currentFive});  
    }
    public  getRepositoryList2(that: any){
      const tabledata2 = jsonModuleResponse.data.tabledata;
      if (_items2.length === 0) {
          _items2.push()
          const newFile = tabledata2.map((repository: any, index: number) => {
          return { serial: index+1,...repository};
          });
          _items2 = newFile;
          // _items2 = that._sortItems(_items2, 'module');
          const indexOfLastTodo = that.state.currentPage * that.state.todosPerPage;
          const indexOfFirstTodo = indexOfLastTodo - that.state.todosPerPage;
          currentFive2 = _items2.slice(indexOfFirstTodo, indexOfLastTodo);
      } 
      that.setState({items2: currentFive2}); 
    }
    public getRepositoryList3(that: any)
    {
      axios.get(modules).then(function (response: any) {
        console.log(response);
        const tabledata2 = response.data;
      if (_items2.length === 0) {
          _items2.push()
          const newFile = tabledata2.map((repository: any, index: number) => {
          return { serial: index+1,...repository};
          });
          _items2 = newFile;
          // _items2 = that._sortItems(_items2, 'module');
          const indexOfLastTodo = that.state.currentPage * that.state.todosPerPage;
          const indexOfFirstTodo = indexOfLastTodo - that.state.todosPerPage;
          currentFive2 = _items2.slice(indexOfFirstTodo, indexOfLastTodo);
      } 
     });
     that.setState({items2: currentFive2}); 
    }
    public getRepositoryList4(that: any)
    {
      axios.get(asset).then(function (response: any) {
        const tabledata2 = response;
      if (_items2.length === 0) {
          _items2.push()
          const newFile = tabledata2.map((repository: any, index: number) => {
          return { serial: index+1,...repository};
          });
          _items2 = newFile;
         //  _items2 = that._sortItems(_items2, 'module');
          const indexOfLastTodo = that.state.currentPage * that.state.todosPerPage;
          const indexOfFirstTodo = indexOfLastTodo - that.state.todosPerPage;
          currentFive2 = _items2.slice(indexOfFirstTodo, indexOfLastTodo);
      } 
     })
     that.setState({items2: currentFive2}); 
    }
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
                        onItemInvoked={this._onItemInvoked}
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
    
    private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.asset}`);
    }

   
}        
export default Landing;