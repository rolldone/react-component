import { debounce, DebouncedFunc } from "lodash";
import React from "react";

interface PropsInterface {
  search_filter_datas?: Array<{
    name: string
    key: string
  }>
  query_filter_datas?: Array<{
    name: string
    key: string
  }>
}

interface StateInterface {
  showForm: boolean,
  datas: Array<any>,
  query: any
  columns: Array<{
    name: string
    field: string
  }>
}

interface PropsInterface {
  showForm?: boolean
  onChange?: { (e: any): void }
}

export default class Table extends React.Component<PropsInterface, StateInterface>{
  pendingGet?: DebouncedFunc<any> | null = null;
  constructor(props: any) {
    super(props);
    this.state = {
      showForm: this.props.showForm || false,
      datas: [],
      columns: [],
      query: {}
    }
  }
  renderRowItem(index:number, field: string, value: string, DefaultRender: React.ReactNode) {
    switch (field) {
      default:
        return DefaultRender;
    }
  }
  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<StateInterface>, snapshot?: any): void {
    if (this.props.showForm != prevProps.showForm) {
      this.setState({
        showForm: this.props.showForm || false
      })
    }
  }
  renderSearch(): React.ReactNode {
    return <>
      <form>
        <div className="mb-3">
          <label className="form-label required">Search</label>
          <div>
            <input
              type="text"
              name="search"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={this.handleChange.bind(this, 'FORM_DATA', {})}
            />
            <small className="form-hint">
              Search data with your text clue.
            </small>
          </div>
        </div>
      </form>
    </>
  }

  handleChange(action: string, props?: any, e?: any) {
    let _query = this.state.query
    switch (action) {
      case 'FORM_DATA':
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
            console.log("Query :: ",query);
          }, 1000)
          this.pendingGet(this.state.query);

        })
        break;
    }
  }

  render(): React.ReactNode {
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
            <div className="table-responsive">
              <table className="table table-vcenter card-table">
                <thead>
                  <tr>
                    {(() => {
                      let _arr = [];
                      for (let a = 0; a < columns.length; a++) {
                        _arr.push(<th key={"column-asas-" + a}>{columns[a].name}</th>);
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
                        <tr key={"column-ytytyt-" + a} >
                          {(() => {
                            let _arr = [];
                            for (let b = 0; b < columns.length; b++) {
                              _arr.push(<td key={"column-ytytyt-" + a + '-' + b} className="text-muted">{this.renderRowItem(a,columns[b].name, datas[a], datas[a][columns[b].field])}</td>);
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