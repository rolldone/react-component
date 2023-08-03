import { Button, Modal } from "react-bootstrap";
import BasicModal, { BasicModalProps, BasicModalState } from "../modal/BasicModal";

export type FileCropperType = {
    name?: string
    type?: string
    content?: any
}

export type FileUploadSelectModalState = BasicModalState & {
    file: any
    form_data: FileCropperType
}

export type FileUploadSelectModalProps = BasicModalProps & {
    onInit: { (props: FileUploadSelectModal): void }
    onListener: { (props: FileCropperType): void }
}

export default class FileUploadSelectModal extends BasicModal {
    setState<K extends never>(state: FileUploadSelectModalState | Pick<FileUploadSelectModalState, K>, callback?: (() => void) | undefined): void {
        super.setState(state, callback);
    }

    declare state: Readonly<FileUploadSelectModalState>;
    declare props: Readonly<FileUploadSelectModalProps>;

    constructor(props: any) {
        super(props);
        this.state = {
            showModal: false,
            titleModal: "Select File Upload",
            file: null,
            form_data: {}
        }
        this.props.onInit(this);
    }

    show(props: any) {
        this.setState({
            showModal: true,
        })
    }

    handleClick(action: string, props?: any, e?: any) {
        switch (action) {
            case 'SUBMIT':
                e.preventDefault();
                this.props.onListener(Object.assign({}, {
                    name: this.state.form_data.name,
                    type: this.state.form_data.type,
                    aspect_ratio: null as any,
                    content: this.state.form_data.content
                }));
                setTimeout(() => {
                    this.setState({
                        form_data: {},
                        file: null,
                        croppedFile: null
                    }, () => {
                        this.handleCloseModal();
                    })
                }, 100)
                break;
        }
    }

    handleChange(action: string, props?: any, e?: any) {
        let _form_data = this.state.form_data || {};
        switch (action) {
            case 'HANDLE_FILE_CHANGE':
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    this.setState({
                        file: reader.result,
                        form_data: {
                            ...this.state.form_data,
                            name: file.name,
                            type: file.type,
                            content: file
                        }
                    });
                };
                reader.readAsDataURL(file);
                break;
        }
    }

    evaluateExpression(expression: string) {
        try {
            const fn = new Function(`return ${expression}`);
            const result = fn();
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    render(): JSX.Element {
        return <>
            <Modal show={this.state.showModal} size="lg" onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.titleModal}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <div className="form-label">Custom File Input</div>
                        <input type="file" className="form-control" onChange={this.handleChange.bind(this, 'HANDLE_FILE_CHANGE', {})} />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClick.bind(this, 'SUBMIT', {})}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    }
}
