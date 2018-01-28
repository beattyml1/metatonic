import React = require('react');
/// <reference path="./typings/react/react.d.ts" />

export class InputActions extends React.Component<{ actions: {
  actionName: string;
  actionLabel: string;
  click: () => void}[]
}, any> {
  render() {
    let actions = this.props.actions || [];
    return (
      <span className="input-actions">
        {actions.map(action => <InputActionButton {...action} />)}
      </span>
    );
  }
}

export class InputActionButton extends React.Component<{
  actionName: string;
  actionLabel: string;
  click: () => void}, any> {
  render() { return (
    <button type="button" className={`input-action-button input-action-${this.props.actionName}`}>{this.props.actionLabel}</button>
  );}
}
