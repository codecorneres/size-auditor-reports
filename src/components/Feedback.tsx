import * as React from 'react';
import Layout from '../Layout';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import axios from 'axios';

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
  feedback: string;
}

class Feedback extends React.Component<any, any>  {
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
            name: 'Feedback',
            fieldName: 'feedback',
            minWidth: 200,
            maxWidth: 220,
            isResizable: true,
            onColumnClick: this._onColumnClick,
            data: 'string',
            onRender: (item: IDocument) => {
              return  <span title={item.feedback}>{item.feedback}</span>;
            },
            isPadded: true
          }];
        this.state = {
            feedbacks: '',
            items: _items,
            columns: _columns,
            isModalSelection: true,
            isCompactMode: false
        }
        this._alertClicked = this._alertClicked.bind(this);
        this._onChangeText1 = this._onChangeText1.bind(this);
    }
    public componentDidMount()
	  {
      this.getRepositoryList(this);
    }
    
    public getRepositoryList(that: any)
  	{    
       axios.get('/feedback')
      .then(function (response) { 
      
        const  tabledata = response.data;
        if (_items.length === 0) {
            _items.push()
            
            const newFile = tabledata.map((repository: any, index: number) => {
              return { serial: index+1,...repository};
            });

            _items = newFile;
            
           _items = that._sortItems(_items, 'Serial');
          }
        that.setState({items: _items});
        });  
    }
    public render(): JSX.Element {
        const { columns, isCompactMode, items, isModalSelection} = this.state;
        
        return (
            <div>
                <Layout />
                <div className="ms-Grid-row bdy">
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg2" />
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg8">
                        <div className="Apps">
                            <div className="feedbackdiv"> 
                            <TextField label="Feedback" multiline onChange={(e) => this._onChangeText1(e.target)} rows={4} required={true} />
                            <PrimaryButton
                                data-automation-id="test"
                                text="Submit"
                                onClick={this._alertClicked}
                                allowDisabledFocus={true}
                            />
                            </div>
                            <div className="feedbacktablediv"> 
                            <TextField placeholder="Search..." label="Filter by FeedBack:" onChange={this._onChangeText} className="docs-TextFieldExample"/>
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
       console.log(_items);
        this.setState({ items: text ? _items.filter(i => i.feedback.toLowerCase().indexOf(text) > -1) : _items });
      };
    
    private _onChangeText1(selectorFiles: any): void{
        this.setState({
          feedbacks: selectorFiles.value,
        });
    }
    private _alertClicked(): void {
        const data = {
            "feedback": this.state.feedbacks
        }
       if(this.state.feedbacks){
        axios.post('/feedbackData',data)
        .then(function (response) { 
           console.log(response);
        });
       }
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

export default Feedback;