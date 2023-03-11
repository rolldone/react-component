import { Component, ReactNode } from "react";
import BaseComponent, { BaseComponentProps, BaseComponentState } from "../../layout/BaseComponent";
import './BasicModal.scss';

export type BasicModalState = {
  showModal: boolean
  titleModal: String
}

export type BasicModalProps = {
  showModal?: boolean
  children?: ReactNode
  titleModal?: String
}

class BasicModal extends BaseComponent {

  setState<K extends never>(state: BasicModalState | ((prevState: Readonly<BasicModalState>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void {
    super.setState(state, callback);
  }
  declare state: Readonly<BasicModalState>;
  declare props: Readonly<BasicModalProps>;

  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      titleModal: ''
    };
  }

  componentDidUpdate(prevProps: Readonly<BasicModalProps>, prevState: Readonly<BasicModalState>, snapshot?: any): void {
    if (this.props.showModal != prevProps.showModal) {
      this.setState({
        showModal: this.props.showModal
      })
    }
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;
    return (
      <div className="basic-modal-s234345">
        <button onClick={this.handleOpenModal}>Open Modal</button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Modal Title</h3>
                <button className="close-button" onClick={this.handleCloseModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">{this.props.children}</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={this.handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BasicModal;