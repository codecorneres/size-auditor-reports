import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
let _items: IDocument[] = [];
let currentFive: IDocument[] = [];
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
  module: string;
  sizeDifference: string;
}
class AssetsValue extends React.Component<any, IDetailsListDocumentsExampleState>  {
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
            return  <span>{item.module}</span>;
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
        console.log(params.name);
        this.getRepositoryList(this);
    }
    public getRepositoryList(that: any)
	{
		/*axios.post('https://jsonplaceholder.typicode.com/posts',[{
      asset: "asset1",
      sizeDifference: "+100"
    },
    {
      asset: "asset2",
      sizeDifference: "+50"
    }])
		.then(function (response) {*/
      /*const tabledata = [{
        asset: "asset1",
        sizeDifference: "+100"
      },
      {
        asset: "asset2",
        sizeDifference: "+50"
      },
      
      {
        asset: "asset3",
        sizeDifference: "+150"
      },
      {
        asset: "asset4",
        sizeDifference: "+200"
      },
      {
        asset: "asset5",
        sizeDifference: "+250"
      },
      {
        asset: "asset6",
        sizeDifference: "+300"
      },
      {
        asset: "asset7",
        sizeDifference: "+350"
      },
      {
        asset: "asset8",
        sizeDifference: "+450"
      },
      {
        asset: "asset9",
        sizeDifference: "+550"
      },
      {
        asset: "asset10",
        sizeDifference: "+650"
      },
      {
        asset: "asset11",
        sizeDifference: "+750"
      }
    ];
      if (_items.length === 0) {
        _items.push()
        const newFile = tabledata.map((repository: any, index: number) => {
          return { serial: index+1,...repository};
        });
        _items = newFile;
        _items = that._sortItems(_items, 'Serial');
        const indexOfLastTodo = that.state.currentPage * that.state.todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - that.state.todosPerPage;
        currentFive = _items.slice(indexOfFirstTodo, indexOfLastTodo);
      } */
      const tabledata= [{
        serial : 1,
        module: "module3.js",
        sizeDifference: "+50"
      }]
      _items = [];
      currentFive = tabledata;
     that.setState({items: currentFive});
    }

    public render(): JSX.Element {
        const { columns, isCompactMode, items, isModalSelection} = this.state;
        return (
            <div className="Apps">  
            { }
                <TextField placeholder="Search..." label="Filter by Asset:" onChange={this._onChangeText} className="docs-TextFieldExample"/>
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
        this.setState({ items: text ? _items.filter(i => i.asset.toLowerCase().indexOf(text) > -1) : _items });
      };
    
      private _onItemInvoked(item: any): void {
        alert(`Item invoked: ${item.asset}`);
      }
    
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