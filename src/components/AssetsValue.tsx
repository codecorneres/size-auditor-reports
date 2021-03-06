import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
// import { jsonResponse } from './../upload/AssetsValueData';
import ExpressFileUpload from './ExpressFileUpload';
import Layout from './../Layout';
import axios from 'axios';
let _items: IDocument[] = [];
let parameters: any = '';
export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: IDocument[];
  isModalSelection: boolean;
  isCompactMode: boolean;
  currentPage: number;
  todosPerPage: number;
  showResults: boolean;
  
}

export interface IDocument {
  [key: string]: any;
  serial: number;
  assets: string;
  modules: [
    {
      module: string,
      sizeDifference: string
    }
  ];
  
}
class AssetsValue extends React.Component<any, IDetailsListDocumentsExampleState>  {
  private _selection: Selection;
  constructor(props: any) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);
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
      onColumnClick: this._onColumnClick,
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
      minWidth: 200,
      maxWidth: 220,
      isResizable: true,
      onColumnClick: this._onColumnClick,
      data: 'string',
      onRender: (item: IDocument) => {
        return  <span title={item.module}>{item.module}</span>;
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
      onColumnClick: this._onColumnClick,
      onRender: (item: IDocument) => {
        return <span>{item.sizeDifference}</span>;
      },
      isPadded: true
    }];
  
    this.state = {
      items: _items,
      columns: _columns,
      isModalSelection: true,
      isCompactMode: false,
      currentPage: 1,
      todosPerPage: 5,
      showResults: false
    };
  }
  public componentDidMount()
  {
      const { match: { params } } = this.props;
      parameters = params.name;
      console.log(parameters);
      this.getRepositoryList(this);
  }
  public getRepositoryList(that: any)
  {
    _items = [];
    let tabledata: any =  [];
    axios.get('/AssetsValueData')
        .then(function (response) {
        // console.log(response);
        tabledata = response.data;
        if (_items.length === 0) {
          for(const row of tabledata){
            if(row.asset === parameters){
                const moduledata = row.modules;
                _items.push()
                const newFile = moduledata.map((repository: any, index: number) => {
                  return { serial: index+1,...repository};
                });
                _items = newFile;
            }
          }
          _items = that._sortItems(_items, 'Serial');
        }
        that.setState({items: _items});
    });
  }
  public onUpdate(data: any)
  {
    console.log(data);
  }

  public render(): JSX.Element {
    const { columns, isCompactMode, items, isModalSelection} = this.state;
    return (
      <div>
        <ExpressFileUpload onUpdate={this.onUpdate}/>
        <Layout />
        <div className="flex bdy">
          <div className="flex-direction Apps">
              <TextField placeholder="Search..." label="Filter by Module:" onChange={this._onChangeText} className="docs-TextFieldExample"/>
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
  
  private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({ items: text ? _items.filter(i => i.module.toLowerCase().indexOf(text) > -1) : _items });
  };

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, items } = this.state;
    let newItems: IDocument[] = items.slice();
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter((currCol: IColumn, idx: number) => {
      return column.key === currCol.key;
    })[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    newItems = this._sortItems(newItems, currColumn.fieldName || '', currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      items: newItems
    });
  };

  private _sortItems = (items: IDocument[], sortBy: string, descending = false): IDocument[] => {
    if (descending) {
      return items.sort((a: IDocument, b: IDocument) => {
        if (a[sortBy] < b[sortBy]) {
          return 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return -1;
        }
        return 0;
      });
    } else {
      return items.sort((a: IDocument, b: IDocument) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }
  };
}

export default AssetsValue;