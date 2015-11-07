import React from 'react';

import TextStore from '../stores/textStore';
import TextAction from '../actions/textAction';

export default class Setting extends React.Component {
  constructor() {
    super();
    this.inputChangeHandler = this.handleInputChange.bind(this);
  }

  isCurrentText(key) {
    return key === this.props.text.key;
  }

  handleRemoveText(key) {
    TextAction.remove(this.props.text.key);
    this.props.handleSelectText(null);
  }

  handleCopyText(key) {
    TextAction.copy(this.props.text.key);
    this.props.handleSelectText(null);
  }

  handleSelectText(key) {
    this.props.handleSelectText(
      this.isCurrentText(key) ? null : key
    );
  }

  handleInputChange(e) {
    this.props.handleInputChange(e.target.name, e.target.value);
  }

  render() {
    return (
      <div className="setting">
        <div>
          {(() => {
            if (TextStore.undoable()) {
              return (
                <button onClick={this.props.handleUndo}>undo</button>
              );
            }
          })()}
          {(() => {
            if (TextStore.redoable()) {
              return (
                <button onClick={this.props.handleRedo}>redo</button>
              );
            }
          })()}
        </div>
        <div>
          previewWidth<input defaultValue={this.props.previewWidth} />
          <button onClick={this.props.changePreviewWidth}>change</button>
        </div>
        <ul>
          <li>class<input name="key" value={this.props.text.key} onChange={this.inputChangeHandler} /></li>
          <li>value<input name="value" value={this.props.text.value} onChange={this.inputChangeHandler} /></li>
          <li>x<input name="x" value={this.props.text.x} onChange={this.inputChangeHandler} /></li>
          <li>y<input name="y" value={this.props.text.y} onChange={this.inputChangeHandler} /></li>
          <li>width<input name="width" value={this.props.text.width} onChange={this.inputChangeHandler} /></li>
          <li>height<input name="height" value={this.props.text.height} onChange={this.inputChangeHandler} /></li>
          <li>font-size<input name="fontSize" value={this.props.text.fontSize} onChange={this.inputChangeHandler} /></li>
          <li>scale<input name="scale" value={this.props.text.scale} onChange={this.inputChangeHandler} /></li>
          <li>line-height<input name="lineHeight" value={this.props.text.lineHeight} onChange={this.inputChangeHandler} /></li>
          <li>maxLen<input name="maxLen" value={this.props.text.maxLen} onChange={this.inputChangeHandler} /></li>
          <li>maxLine<input name="maxLine" value={this.props.text.maxLine} onChange={this.inputChangeHandler} /></li>
        </ul>
        {(() => {
          if (!TextStore.exists(this.props.text.key)) {
            return (
              <button onClick={this.props.handleUpdateText}>add</button>
            );
          }
          return (
            <div>
              <button onClick={this.handleCopyText.bind(this)}>copy</button>
              <button onClick={this.handleRemoveText.bind(this)}>remove</button>
            </div>
          );
        })()}

        <ul className="text-list">
          {(() => {
            return this.props.texts.map((text) => {
              let className = 'text-item'
              if (this.isCurrentText(text.key)) {
                className += ' selected';
              }
              return (
                <li
                  className={className}
                  key={text.key}
                  onClick={this.handleSelectText.bind(this, text.key)} >
                  {text.key}
                </li>
              );
            });
          })()}
        </ul>
      </div>
    );
  }
}

