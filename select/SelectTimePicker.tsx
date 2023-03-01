import { ReactNode } from "react";
import ReactDatePicker from "react-datepicker";
import SelectDateTimePicker from "./SelectDateTimePicker";

export default class SelectTimePicker extends SelectDateTimePicker {
  render(): ReactNode {
    return <>
      <ReactDatePicker
        selected={this.state.value}
        onChange={(date) => {
          this.props.onChange({
            target: {
              name: this.props.name,
              value: date
            }
          })
        }}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="time"
        dateFormat="h:mm aa"
        className={this.props.className}
        name={this.props.name} />
    </>
  }
}