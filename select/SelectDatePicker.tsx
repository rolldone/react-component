import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type SelectDatePickerState = {
  value: Date
}

export type SelectDatePickerProps = {
  value: Date | null | undefined
  name: string
  onChange: {
    (props: {
      target: {
        name: string
        value: any
      }
    }): void
  }
  className?: string
}

export default class SelectDatePicker extends React.Component {
  setState<K extends never>(state: SelectDatePickerState | ((prevState: Readonly<SelectDatePickerState>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void {
    super.setState(state, callback);
  }
  declare state: Readonly<SelectDatePickerState>;
  declare props: Readonly<SelectDatePickerProps>;
  constructor(props: any) {
    super(props);
    this.state = {
      value: this.props.value as Date
    }
  }
  componentDidUpdate(prevProps: Readonly<SelectDatePickerProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.value != prevProps.value) {
      this.setState({
        value: this.props.value
      })
    }
  }
  render(): React.ReactNode {
    return <>
      <ReactDatePicker
        className={this.props.className}
        name={this.props.name}
        onChange={(date) => {
          this.props.onChange({
            target: {
              name: this.props.name,
              value: date
            }
          })
        }}
        selected={this.state.value} />
    </>
  }
}