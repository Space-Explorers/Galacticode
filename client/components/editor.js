import React, {Component} from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace'

import 'brace/mode/jsx';
import 'brace/ext/searchbox'
import 'brace/mode/javascript'
import 'brace/snippets/javascript'
import 'brace/theme/monokai'
import 'brace/ext/language_tools'

const defaultValue = `
  function onLoad(editor) {
  console.log("i've loaded")
  }
`

class Editor extends Component {
  constructor () {
    super()
    this.state = {
      mode: 'javascript',
      theme: 'monokai',
      value: defaultValue,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      showLineNumbers: true,
      tabSize: 2

    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(newValue) {
    this.setState({
      value: newValue
    })
    console.log(this.state.value)
  }

  onSelectionChange(newValue, event) {
    // console.log('select-change', newValue);
    // console.log('select-change-event', event);
  }

  onCursorChange(newValue, event) {
    // console.log('cursor-change', newValue);
    // console.log('cursor-change-event', event);
  }

  render() {
    return (
      <AceEditor
        mode={this.state.mode}
        theme={this.state.theme}
        name="input"
        onChange={this.onChange}
        onSelectionChange={this.onSelectionChange}
        onCursorChange={this.onCursorChange}
        fontSize={this.state.fontSize}
        showPrintMargin={this.state.showPrintMargin}
        showGutter={this.state.showGutter}
        highlightActiveLine={this.state.highlightActiveLine}
        value={this.state.value}
        enableBasicAutocompletion={this.state.enableBasicAutocompletion}
        enableLiveAutocompletion={this.state.enableLiveAutocompletion}
        showLineNumbers={this.state.showLineNumbers}
        tabSize={this.state.tabSize}
      />
    )
  }
}

export default Editor
