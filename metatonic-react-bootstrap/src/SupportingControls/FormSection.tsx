import {isMobile} from "UI";
import React = require('react');
/// <reference path="./typings/react/react.d.ts" />

export default class FormSection  extends React.Component<{
  id: string;
  hlevel: number;
  label: string;
}, any> {
  render() {
      return(
        <section className="form-section">
          {`<h${this.props.hlevel} id=${this.props.id} class="section-label form-section-label">`}
            {this.props.label}
          {`</h${this.props.hlevel}>`}
          <div className="section-content form-section-content">
            {(this.props as any).children}
          </div>
        </section>
      );
  }
}
