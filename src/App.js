import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Editor from './Editor';
import { FaHeart } from "react-icons/fa"
import logo1 from './pclub-removebg-preview.png';

function App() {

  const [inputCode, setInputCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const endPoint = "http://traveller.pclub.in/api/interpret"


  const handleRunCode = async () => {
    if (inputCode === "") {
      setOutput("Write some code first!")
      return
    }

    var response = await (await fetch(endPoint, {
      method: 'POST',
      body: new URLSearchParams({
        code: inputCode,
        input: input
      })
    })).json();

    console.log(response.output)

    setOutput(response.output);
  }

  const handleRedirect = () => {
    window.open("https://iitk-traveller-docs.netlify.app/")
  }


  return (

    <div className="App">
      <header className="App-header">
        <img src={logo1} className="logo" alt='IITK Traveller'></img>
        <h1>Welcome to IIT-K Traveller</h1>
      </header>
      <div className='pane'>
        <div className='inputCode'>
          <Editor
            language="xml"
            displayName="Input Code"
            value={inputCode}
            onChange={setInputCode}
          />
        </div>
        <div className='btns'>
          <button className='btn-three' onClick={handleRunCode}>Run Code</button>
          {/* <button className='btn-three' onClick={window.open("https://iitk-traveller-docs.netlify.app/", "_blank")}>See Documentation</button> */}
          <button className='btn-three' onClick={handleRedirect} >See Documentation</button>
        </div>
        <div className='fields'>
          <Editor
            language="xml"
            displayName="Input Field"
            value={input}
            onChange={setInput}
          />
          <Editor
            language="xml"
            displayName="Output Field"
            value={output}
            onChange={setOutput}
          />
        </div>
      </div>
      <div className='footer'>Made with  <FaHeart />  by Programming Club, IIT- Kanpur</div>
    </div>
  );
}

export default App;
