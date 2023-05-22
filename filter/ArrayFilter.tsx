import { ReactNode } from "react";
import LayoutBody from "../../layout/LayoutBody";

export type ArrayWhere = Array<{
    column: string
    value: string
}>
export type ArrayFilterState = {
    wheres: ArrayWhere
    where_datas: Array<Array<any>>
}

export type ArrayFilterProps = {
    onListener: { (props: any): void }
    value?: ArrayWhere
}

export default class ArrayFilter extends LayoutBody {
    setState<K extends never>(state: ArrayFilterState | Pick<ArrayFilterState, K>, callback?: (() => void) | undefined): void {
        super.setState(state, callback);
    }
    declare state: Readonly<ArrayFilterState>;
    declare props: Readonly<ArrayFilterProps>;

    constructor(props: ArrayFilterProps) {
        super(props);
        this.state = {
            wheres: [],
            where_datas: []
        }
    }

    async handleChange(action: string, props?: any, e?: any) {
        let _where_datas = this.state.where_datas || [];
        let _wheres = this.state.wheres || [];
        let _where = null;
        switch (action) {
            case 'FORM_DATA':
                switch (e.target.name) {
                    case 'column':
                        _where = _wheres[props.index] || {};
                        if (e.target.value == "") {
                            _wheres.splice(props.index, 1);
                            _where_datas.splice(props.index, 1);
                        } else {
                            _where.column = e.target.value;
                            _wheres[props.index] = _where;
                            _where_datas[props.index] = await this.getSelectedCollections(_wheres, props.index);
                        }
                        break;
                    case 'value':
                        _where = _wheres[props.index] || {};
                        _where.value = e.target.value;
                        _wheres[props.index] = _where;
                        break;
                    default:
                        break;
                }
                this.setState({
                    wheres: _wheres,
                    where_datas: _where_datas
                }, async () => {
                })
                break;
        }
    }

    handleClick(action: string, props?: any, e?: any) {
        let _wheres = this.state.wheres || [];
        switch (action) {
            case 'SEARCH':
                e.preventDefault();
                this.props.onListener(this.state.wheres);
                break;
            case 'ADD_MORE':
                e.preventDefault();
                _wheres.push({
                    column: "",
                    value: ""
                })
                this.setState({
                    wheres: _wheres
                })
                break;
        }
    }

    async getSelectedCollections(wheres: ArrayWhere, index: number): Promise<Array<any>> {

        return [];
    }

    renderComponentFilter(index: number) {
        return <></>
    }

    render(): ReactNode {
        return <>
            <div className="card mb-3">
                <div className="card-body">
                    <h3 className="card-title">Filter Option</h3>
                    {this.state.wheres?.map((props, index) => {
                        return this.renderComponentFilter(index);
                    })}
                    <a href="#" className="btn btn-blue" onClick={this.handleClick.bind(this, 'ADD_MORE', {})}>
                        Add
                    </a>
                </div>
                <div className="card-footer">
                    <div className="row align-items-center">
                        <div className="col">
                            Learn more about <a href="#">Project ID</a>
                        </div>
                        <div className="col-auto">
                            <a href="#" className="btn btn-primary" onClick={this.handleClick.bind(this, 'SEARCH', {})}>
                                Search
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}