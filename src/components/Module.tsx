import 'react-bootstrap/dist/react-bootstrap';
import * as React from 'react';
import axios from 'axios';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
let _items: IDocument[] = [];

export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: IDocument[];
  isModalSelection: boolean;
  isCompactMode: boolean;
}

export interface IDocument {
  [key: string]: any;
  serial: number;
  module: string;
  sizeDifference: string;
  assetsImpactedCount: number;
  assetsImpactedNames:  string[];
}
class Module extends React.Component<any, IDetailsListDocumentsExampleState>  {
  private _selection: Selection;
  constructor(props: any) {
    super(props);
    const _columns: IColumn[] = [
    {
      key: 'column1',
      name: 'Serial',
      fieldName: 'serial',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
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
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      onColumnClick: this._onColumnClick,
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
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isCollapsible: true,
      data: 'string',
      onColumnClick: this._onColumnClick,
      onRender: (item: IDocument) => {
        return <span>{item.sizeDifference}</span>;
      },
      isPadded: true
    },
    {
        key: 'column4',
        name: 'Assets Affecteed',
        fieldName: 'assetsImpactedCount',
        minWidth: 100,
        maxWidth: 120,
        isResizable: true,
        isCollapsible: true,
        data: 'number',
        onColumnClick: this._onColumnClick,
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
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.assetsImpactedNames+','}</span>;
        },
        isPadded: true
      }
    ];
  
    this.state = {
      items: _items,
      columns: _columns,
      isModalSelection: true,
      isCompactMode: false
    };
  }
  public componentDidMount()
	{
    this.getRepositoryList(this);
  }  
  public getRepositoryList(that: any)
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
      const tabledata = [{
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
      }];
      if (_items.length === 0) {
        _items.push()
        const newFile = tabledata.map((repository: any, index: number) => {
          return { serial: index+1,...repository};
        });
        _items = newFile;
        _items = that._sortItems(_items, 'module');
      } 
			that.setState({items: _items});
		})
    .catch(function (error) {
      console.log(error);
    });
  }
  public render(): JSX.Element { 
    const { columns, isCompactMode, items, isModalSelection } = this.state;
    return (
      <div className="Apps">    
        <TextField label="Filter by Module:" onChange={this._onChangeText} />
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
          />
        </MarqueeSelection>
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

export default Module;