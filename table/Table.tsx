import { debounce, DebouncedFunc, isEqual } from "lodash";
import React from "react";
import MakeId from "../helper/MakeId";

export type TableState = {
  showForm: boolean,
  datas: Array<any>,
  query: any
  columns: Array<{
    name: string
    field: string
    className?: string
  }>
}

export type TablePropsInterface = {
  showForm?: boolean
  onChange?: { (e: any): void }
  query?: any
}

export default class Table extends React.Component {
  setState<K extends never>(state: TableState | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void {
    return super.setState(state, callback);
  }
  declare state: Readonly<TableState>;
  declare props: Readonly<TablePropsInterface>;

  pendingGet?: DebouncedFunc<any> | null = null;
  constructor(props: any) {
    super(props);
    this.state = {
      showForm: this.props.showForm || false,
      datas: [],
      columns: [],
      query: this.props.query || {}
    }
  }
  renderRowItem(index: number, name: string, props: any, DefaultRender: React.ReactNode) {
    switch (name) {
      default:
        return DefaultRender;
    }
  }
  renderHeadItem(index: number, name: string, props: any, DefaultRender: React.ReactNode) {
    switch (name) {
      default:
        return DefaultRender;
    }
  }
  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<TableState>, snapshot?: any): void {
    if (this.props.showForm != prevProps.showForm) {
      this.setState({
        showForm: this.props.showForm || false
      })
    }
    if (isEqual(this.props.query, prevProps.query) == false) {
      this.setState({
        query: this.props.query
      })
    }
  }
  renderSearch(): React.ReactNode {
    return <>
      <div>
        <div className="mb-3">
          <label className="form-label required">Search</label>
          <div>
            <input
              type="text"
              name="search"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={this.handleChange.bind(this, 'FORM_QUERY', {})}
            />
            <small className="form-hint">
              Search data with your text clue.
            </small>
          </div>
        </div>
      </div>
    </>
  }

  handleChange(action: string, props?: any, e?: any) {
    let _query = this.state.query
    switch (action) {
      case 'FORM_QUERY':
        _query = {
          ..._query,
          [e.target.name]: e.target.value
        }
        this.setState({
          query: _query
        }, () => {
          if (this.pendingGet != null) {
            this.pendingGet.cancel();
          }
          this.pendingGet = debounce((query: any) => {
            console.log("Query :: ", query);
          }, 1000)
          this.pendingGet(this.state.query);
        })
        break;
    }
  }

  render(): React.ReactNode {
    let randomString = MakeId(10);
    let { showForm, datas, columns } = this.state;
    let filter = <>
      {showForm == true ? (
        this.renderSearch()
      ) : null}
    </>
    if (datas.length == 0) {
      return <>
        <div className="row">
          <div className="col-12">
            {filter}
            <div className="card">
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><div className="form-control-plaintext">Data is empty</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    }
    return <>
      <div className="row">
        <div className="col-12">
          {filter}
          <div className="card">
            <div className="table-responsive" style={{ "minHeight": "400px" }}>
              <table className="table table-vcenter card-table">
                <thead>
                  <tr>
                    {(() => {
                      let _arr = [];
                      for (let a = 0; a < columns.length; a++) {
                        _arr.push(<th key={`column-${randomString}-` + a} className={`${columns[a].className}`}>{this.renderHeadItem(a, columns[a].name, datas[a], columns[a].name)}</th>);
                      }
                      return _arr;
                    })()}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    let _arr = [];
                    for (let a = 0; a < datas.length; a++) {
                      _arr.push(
                        <tr key={`row-${randomString}-${a}`} >
                          {(() => {
                            let _arr = [];
                            for (let b = 0; b < columns.length; b++) {
                              _arr.push(<td key={`td-${randomString}-${a}-${b}`} className="text-muted">{this.renderRowItem(a, columns[b].name, datas[a], datas[a][columns[b].field])}</td>);
                            }
                            return _arr;
                          })()}
                        </tr>
                      );
                    }
                    return _arr;
                  })()}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  }
}