import React from 'react';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface StateInterface {
  selected?: Date | undefined
}

interface PropsInterface {
  value?: Date
  onChange?: {
    (e: {
      target: {
        name: string,
        value: Date
      }
    }): void
  }
  name?: string
}

export default class SelectDayPicker extends React.Component<PropsInterface, StateInterface>{
  constructor(props: any) {
    super(props);
    this.state = {
      selected: this.props.value || undefined
    }
  }
  componentDidUpdate(prevProps: Readonly<PropsInterface>, prevState: Readonly<StateInterface>, snapshot?: any): void {
    if (this.props.value != prevProps.value) {
      this.setState({
        selected: this.props.value
      })
    }
  }
  handleChange(action: string, props?: any, e?: any) {
    switch (action) {
      case 'SELECT':
        if (this.props.onChange == null) return;
        this.props.onChange({
          target: {
            name: this.props.name || '',
            value: e || new Date()
          }
        });
        break;
    }
  }
  render(): React.ReactNode {
    return <>
      <DayPicker
        mode="single"
        defaultMonth={this.state.selected}
        selected={this.state.selected}
        onSelect={this.handleChange.bind(this, 'SELECT', {})}
        footer={<p className='m-2'>You picked {format(this.state.selected || new Date(), 'PP')}.</p>}
      />
    </>
  }
}