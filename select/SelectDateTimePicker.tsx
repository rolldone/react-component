import { setHours, setMinutes } from "date-fns";
import ReactDatePicker from "react-datepicker";
import SelectDatePicker from "./SelectDatePicker";

export default class SelectDateTimePicker extends SelectDatePicker {
  render(): React.ReactNode {
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
        timeIntervals={15}
        timeCaption="time"
        showTimeSelect
        timeFormat="HH:mm"
        /* injectTimes={[
          setHours(setMinutes(new Date(), 1), 0),
          setHours(setMinutes(new Date(), 5), 12),
          setHours(setMinutes(new Date(), 59), 23),
        ]} */
        dateFormat="MMMM d, yyyy h:mm aa"
        className={this.props.className}
        name={this.props.name} />
    </>
  }
}