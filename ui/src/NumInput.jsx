import React from 'react';

function format(num) {
  return num != null ? num.toString() : '';
}

function unformat(str, isDecimal) {
  const val = isDecimal ? parseFloat(str, 10) : parseInt(str, 10);
  return Number.isNaN(val) ? null : val;
}

export default class NumInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: format(props.value) };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.value.match(/^\d*\.?\d*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  onBlur(e) {
    const { onChange, isDecimal = false } = this.props;
    const { value } = this.state;
    onChange(e, unformat(value, isDecimal));
  }

  render() {
    const { value } = this.state;
    const { isDecimal, ...restProps } = this.props;
    return (
      <input
        {...restProps}
        type="text"
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
