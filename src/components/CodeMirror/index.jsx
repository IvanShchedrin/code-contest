require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

import {UnControlled as CodeMirrorControlled} from 'react-codemirror2';

export const CodeMirror = () => (
  <>
    <CodeMirrorControlled
      value={'<h1>Hello Code Mirror</h1>'}
      options={{}}
      onBeforeChange={(editor, data, value) => {
        console.log('onBeforeChange', value);
      }}
      onChange={(editor, value) => {
        console.log('onChange', value);
      }}
    />
  </>
);
