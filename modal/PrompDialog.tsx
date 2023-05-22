import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"


export type PendingPromptDialogType = {
  show?: Function
}

const PendingPromptDialog = (props: {
  show?: Function
  onInit: { (self: PendingPromptDialogType): void }
  onListener?: { (props?: any): void }
  submit_text?: string
  cancel_text?: string
  title_text?: string
  message_text?: string
}) => {
  let [getShow, setShow] = useState(false);
  let _props = props;
  useEffect(() => {
    let _func: PendingPromptDialogType = {
      show: () => {
        setShow(true);
      }
    }
    _props.onInit(_func);
  }, [])

  const handleClose = (action: string, props?: any, e?: any) => {
    switch (action) {
      case 'CLOSE':
        setShow(false);
        break;
      case 'SUBMIT':
        setShow(false);
        if (_props.onListener == null) return;
        _props.onListener();
        break;
    }
  }
  return <>
    <Modal show={getShow} onHide={handleClose.bind(null, 'CLOSE')}>
      <Modal.Header closeButton>
        <Modal.Title>{_props.title_text || "This is title"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{_props.message_text || "This is message"}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose.bind(null, 'CLOSE')}>
          {props.cancel_text || 'Close'}
        </Button>
        <Button variant="primary" onClick={handleClose.bind(null, 'SUBMIT')}>
          {_props.submit_text || 'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export default PendingPromptDialog;