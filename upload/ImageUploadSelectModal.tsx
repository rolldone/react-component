import { Button, Modal } from "react-bootstrap";
import BasicModal, { BasicModalProps, BasicModalState } from "../modal/BasicModal";
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export type ImageCropperType = {
  aspect_ratio?: string
  name?: string
  type?: string
  content?: any
}

export type ImageUploadSelectModalState = BasicModalState & {
  croppedImage: any
  image: any
  form_data: ImageCropperType
}

export type ImageUploadSelectModalProps = BasicModalProps & {
  onInit: { (props: ImageUploadSelectModal): void }
  onListener: { (props: ImageCropperType): void }
}

export default class ImageUploadSelectModal extends BasicModal {
  setState<K extends never>(state: ImageUploadSelectModalState | Pick<ImageUploadSelectModalState, K>, callback?: (() => void) | undefined): void {
    super.setState(state, callback);
  }

  declare state: Readonly<ImageUploadSelectModalState>;
  declare props: Readonly<ImageUploadSelectModalProps>;
  declare cropper_comp?: ReactCropperElement;

  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      titleModal: "Select File Upload",
      croppedImage: null,
      image: null,
      form_data: {}
    }
    this.props.onInit(this);
  }

  show(props: any) {
    this.setState({
      showModal: true,
      croppedImage: null
    })
  }

  handleClick(action: string, props?: any, e?: any) {
    switch (action) {
      case 'SUBMIT':
        e.preventDefault();
        if (this.cropper_comp == null) {
          return
        };
        const cropper = this.cropper_comp.cropper as Cropper;
        if (cropper == null) {
          return;
        };
        if (typeof cropper.getCroppedCanvas() === 'undefined') {
          return;
        }
        this.props.onListener(Object.assign({}, {
          name: this.state.form_data.name,
          type: this.state.form_data.type,
          aspect_ratio: this.state.form_data.aspect_ratio,
          content: cropper.getCroppedCanvas().toDataURL()
        }));
        setTimeout(() => {
          this.cropper_comp = null as any;
          this.setState({
            form_data: {},
            image: null,
            croppedImage: null
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
      case 'HANDLE_IMAGE_CHANGE':
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.setState({
            image: reader.result,
            form_data: {
              ...this.state.form_data,
              name: file.name,
              type: file.type
            }
          });
        };
        reader.readAsDataURL(file);
        break;
      case 'HANDLE_CROP':
        if (this.cropper_comp == null) {
          return
        };
        const cropper = this.cropper_comp.cropper as any;
        if (cropper == null) {
          return;
        };
        if (typeof cropper.getCroppedCanvas() === 'undefined') {
          return;
        }
        this.setState({
          croppedImage: cropper.getCroppedCanvas().toDataURL()
        });
        break;
      case 'FORM_DATA':
        switch (e.target.name) {
          case 'aspect_ratio':
            _form_data = {
              ..._form_data,
              [e.target.name]: e.target.value == -1 ? null : e.target.value,
            }
            break;
          default:
            _form_data = {
              ..._form_data,
              [e.target.name]: e.target.value
            }
            break;
        }
        this.setState({
          form_data: _form_data
        }, () => {
          console.log(this.state.form_data);
          if (this.cropper_comp == null) {
            return
          };
          const cropper = this.cropper_comp.cropper as Cropper;
          if (cropper == null) {
            return;
          };
          if (typeof cropper.getCroppedCanvas() === 'undefined') {
            return;
          }
          cropper.setAspectRatio(this.evaluateExpression(this.state.form_data.aspect_ratio as any) as number)
          // cropper.setCanvasData({
          //   height: this.state.form_data.height
          // })
          // cropper.setCropBoxData({
          //   height: this.state.form_data.height,
          // });
        })
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
            <input type="file" className="form-control" onChange={this.handleChange.bind(this, 'HANDLE_IMAGE_CHANGE', {})} />
          </div>
          <div className="mb-3">
            <div className="form-label">Aspect Ratio</div>
            <select className="form-select" name="aspect_ratio" value={this.state.form_data.aspect_ratio} onChange={this.handleChange.bind(this, 'FORM_DATA', {})}>
              <option value={"-1"}>Free</option>
              <option value={"1/1"}>1:1</option>
              <option value={"4/3"}>4:3</option>
              <option value={"16/9"}>16:9</option>
              <option value={"3/2"}>3:2</option>
            </select>
          </div>
          <div className="mb-3">
            <div className="form-label">Cropper</div>
            <Cropper
              ref={(cropper) => {
                this.cropper_comp = cropper as any;
              }}
              src={this.state.image}
              style={{ height: 400, width: "100%" }}
              aspectRatio={this.evaluateExpression(this.state.form_data.aspect_ratio as any)}
              guides={false}
              crop={this.handleChange.bind(this, 'HANDLE_CROP', {})}
            />
          </div>
          <div className="mb-3">
            <div className="form-label">Result</div>
            {this.state.croppedImage != null ? <img src={this.state.croppedImage} alt="Cropped" style={{ width: '100%' }} /> : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClick.bind(this, 'SUBMIT', {})}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  }
}