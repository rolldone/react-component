import { ReactNode } from "react";
import LayoutBody from "../../layout/LayoutBody";

export type LaravelPaginationState = {
}

export type LaravelPaginationType = {
    current_page: number
    first_page_url?: string
    from: number
    to: number
    next_page_url?: string
    per_page: number
    prev_page_url?: string
    total: number
    last_page: number
}

export type LaravelPaginationProps = {
    pagination_data: LaravelPaginationType
    onListener: { (props: number): void }
    limit_page?: number
}

export default class LaravelPagination extends LayoutBody {
    setState<K extends never>(state: LaravelPaginationState | Pick<LaravelPaginationProps, K>, callback?: (() => void) | undefined): void {
        super.setState(state, callback);
    }
    declare state: Readonly<LaravelPaginationState>;
    declare props: Readonly<LaravelPaginationProps>;
    constructor(props: LaravelPaginationProps) {
        super(props);
    }
    handleClick(action: string, props?: any, e?: any) {
        switch (action) {
            case 'CHANGE_PAGE':
                e.preventDefault();
                this.props.onListener(props.page)
                break;
        }
    }
    render(): ReactNode {
        return <>
            <div className="card">
                <div className="card-body">
                    <ul className="pagination" style={{ float: "right" }}>
                        <li className={"page-item " + (this.props.pagination_data.prev_page_url == null ? "disabled" : "")}>
                            <a className="page-link" href="#" tabIndex={-1} aria-disabled="true" onClick={this.handleClick.bind(this, 'CHANGE_PAGE', { page: this.props.pagination_data.current_page - 1 })}>
                                {/* Download SVG icon from http://tabler-icons.io/i/chevron-left */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M15 6l-6 6l6 6" />
                                </svg>
                                prev
                            </a>
                        </li>
                        {(() => {
                            let _arr = [];
                            let limit_page = this.props.limit_page || 3;
                            let current_page = this.props.pagination_data.current_page;
                            let start_page = current_page - limit_page;
                            if (start_page <= 1) {
                                start_page = 1;
                            }
                            let last_page = current_page + limit_page;
                            if (last_page >= this.props.pagination_data.last_page) {
                                last_page = this.props.pagination_data.last_page;
                            }
                            for (let a = start_page; a <= last_page; a++) {
                                _arr.push(<li key={"pagie" + a} className={"page-item " + (this.props.pagination_data.current_page == a ? "active" : "")}>
                                    <a className="page-link" href="#" onClick={this.handleClick.bind(this, 'CHANGE_PAGE', { page: a })}>
                                        {a}
                                    </a>
                                </li>)
                            }
                            return _arr;
                        })()}

                        <li className={"page-item " + (this.props.pagination_data.next_page_url == null ? "disabled" : "")}>
                            <a className="page-link" href="#" onClick={this.handleClick.bind(this, 'CHANGE_PAGE', { page: this.props.pagination_data.current_page + 1 })}>
                                next {/* Download SVG icon from http://tabler-icons.io/i/chevron-right */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    }
}