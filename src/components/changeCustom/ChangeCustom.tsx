import React from 'react';

type Props = {
  type: 'input' | 'textarea';
  value: string | number;
  props?: Object;
  onChangeCustom?: Function;
};

type ValueElement = {
  value: string | number;
};

export default class ChangeCustom extends React.Component<Props> {
  nativeElement = React.createRef();

  componentDidUpdate(prevProps: ValueElement) {
    const input: unknown = this.nativeElement.current;
    const { value } = this.props;
    const isNewValue = prevProps.value !== value;

    if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) return;

    if (isNewValue || value !== input.value) {
      input.value = String(value);
    }
  }

  checkChange = (event: FocusEvent | React.KeyboardEvent) => {
    const element = event.target;
    const value = this.props.value.toString();

    if (!this.props) {
      return;
    }

    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
      return;
    }

    if (this.props.onChangeCustom instanceof Function) {
      if (value !== element.value) {
        this.props.onChangeCustom(event);
      }
    }
  };

  render() {
    return React.createElement(this.props.type, {
      ...{
        defaultValue: this.props.value,
        onBlur: (event: FocusEvent) => {
          this.checkChange(event);
        },
        onKeyUp: (event: React.KeyboardEvent) => {
          if (event.key === 'Enter') {
            this.checkChange(event);
          }
        },
        ref: this.nativeElement,
      },
      ...(this.props.props ?? {}),
    });
  }
}
