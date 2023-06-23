import React, { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import 'react-simple-keyboard/build/css/theme-dark.css';
import 'simple-keyboard/build/css/index.css';
import 'simple-keyboard/build/css/layouts/german.css';


const SimpleKeyboardWrapper = () => {
    const [input, setInput] = useState('');
    
    const onChange = (input) => {
      setInput(input);
    };
    return (
        <div>
          <input
            value={input}
            readOnly
          />
          <Keyboard
            layout="german-qwertz" // Set the layout to German QWERTZ
            theme="hg-theme-dark" // Set the dark theme
            onChange={onChange}
            inputName="input"
          />
        </div>
      );
    };
    
    export default SimpleKeyboardWrapper;
    