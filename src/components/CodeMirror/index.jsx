import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';

import {UnControlled as CodeMirrorControlled} from 'react-codemirror2';

export const CodeMirror = () => (
  <>
    <CodeMirrorControlled
      value={'<h1>Let\'s do some work</h1>'}
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
