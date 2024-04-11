import React, { useState, useEffect } from "react";
import APIService from "../services/APIService";

import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import {linter, lintGutter, Diagnostic} from "@codemirror/lint";


const gptAPIKey = "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";

const ImageUpload = () => {

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [invoiceData, setInvoiceData] = useState("");
  const [invoiceChanged, setInvoiceChanged] = useState(false);
  const [errorResponse, setErrorResponse] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [msgs, setMsgs] = useState([{message: "empty", sender: "User"}]);

  const normaliseLineEndings = (str, normalized = '\n') =>
    str.replace(/\r?\n/g, normalized);

  const upload = (event) => {
    if (!event.target.files[0]) {
      return;
    }
    
    setProgress(0);

    // Set invoiceData to text of xml file in currentFile
    const reader = new FileReader();
    reader.onload = function (e) {
      // Set code mirror value to xml file
      setInvoiceData(normaliseLineEndings(e.target.result));
      setInvoiceChanged(true);
    };

    reader.readAsText(event.target.files[0]);

  };

  const sendGptMsg = async (message) => {
     const newMessage = {
       message: "Explain this \"" + message + "\"",
       sender: "user"
     }
     const final = [...msgs, newMessage];
     setMsgs(final);
     await sendMessageToGpt(final);
    }
  const systemMessage = {
    role: "system",
    content: "Answer the question as an expert in PEPPOL e-invoicing"
  }

  async function sendMessageToGpt(all_msgs) {
    let mapped_messages = all_msgs.map((messageObj) => {
      return {role: "user", content: messageObj.message};
    });
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [systemMessage, ...mapped_messages]
    }
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + gptAPIKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      const modal = document.createElement("div");
      modal.classList.add("modal");
      const content = document.createElement("div");
      content.classList.add("modal-content");
      const closeBtn = document.createElement("span");
      closeBtn.classList.add("close");
      closeBtn.innerHTML = "&times;";
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
      const responseText = document.createElement("p");

      responseText.innerHTML = data.choices[0].message.content.trim().replace(/\n/g, "<br/>");
      content.appendChild(closeBtn);
      content.appendChild(responseText);
      modal.appendChild(content);
      document.body.appendChild(modal);

      modal.style.display = "block";
    });
  }

  document.addEventListener("mouseup", function() {
    var selectedText = window.getSelection().toString();
    setSelectedText(selectedText);
  });

  const updateMarkers = () => {
    // console.log(invoiceData);
    APIService.getLintReport(invoiceData, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    }).then((response) => {
      setInvoiceChanged(false);

      let errors = response.data.report;
      let diagnostics = [];

      errors.forEach(element => {
        const invoiceLines = invoiceData.split("\n");
        const elementLine = invoiceLines[element.line - 1];
        const numWhitespace = elementLine.length - elementLine.trimStart().length;
        const column = element.column ? element.column : numWhitespace;
        
        const from = invoiceLines.slice(0, element.line - 1).join("\n").length + 1 + column;
        const to = from + elementLine.length - column;

        // Create element from html
        let elm = document.createElement("div");
        let rule = document.createElement("div");
        rule.innerText = element.rule_id;
        rule.style.fontWeight = "bold";
        elm.appendChild(rule);
        let message = document.createElement("div");
        message.innerHTML = element.message;
        elm.appendChild(message);

        if (element.suggestion) {
          let suggestion = document.createElement("div");
          suggestion.innerText = "Suggestion: " + element.suggestion;
          elm.appendChild(suggestion);
        }

        diagnostics.push({
          source: "Churros API",
          from: from,
          to: to,
          message: element.message,
          severity: element.severity,
          renderMessage: () => elm,
        });
      });

      setErrorResponse(diagnostics);

    }).catch((err) => {
      setProgress(0);
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Could not upload the invoice!");
      }

    });
  }

  function errorMarker(view) {
    let diagnostics = [];
    errorResponse.map((error) => diagnostics.push(error));

    return diagnostics;
  }


  const editor = (
    <CodeMirror
            value={invoiceData}
            style={{
              outline: "none",
              border: "1px solid silver"
              }}
            height="100%"
            extensions={[xml(), linter(errorMarker), lintGutter()]}
            onChange={(value, viewUpdate) => {
                        setInvoiceChanged(true);
                        setInvoiceData(value);
                        // updateMarkers();
                      }}
          />
  );

  

  return (
    <>
      <div className="row h-80">
        <div className="col-md-5 col-lg-2 d-md-block lemonchiffon sidebar collapse text-center" style={{backgroundColor: 'lemonchiffon'}}>
          <label className="btn btn-success btn-sm d-block" for="file-upload">Import invoice</label>
          <input id="file-upload" className="d-none" type="file" accept=".xml" onChange={upload} />

          {!invoiceChanged && (
            <>
              <button className="btn btn-outline-primary btn-sm w-20" style={{backgroundColor: 'salmon', color: 'white'}} >Download as PDF</button>
              <button className="btn btn-outline-primary btn-sm w-20" style={{backgroundColor: 'salmon', color: 'white'}}>Download as CSV</button>
              <button className="btn btn-outline-primary btn-sm w-20" style={{backgroundColor: 'salmon', color: 'white'}}>Download as HTML</button>
              <button className="btn btn-outline-primary btn-sm w-20" style={{backgroundColor: 'salmon', color: 'white'}}>Download as JSON</button>
            </>
          )}
          <div>
               <br></br>
          </div>
          <div>
            <img style={{ width: 180, height: 280 }} src="https://cafedelites.com/wp-content/uploads/2020/05/Churros-Recipe-IMAGE-124.jpg" alt="Churro Image" />
          </div>
          {message && (
            <div className="alert alert-secondary mt-3" role="alert">
              {message}
            </div>
          )}
        </div>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-1">
          {editor}
          { invoiceChanged && (
            <button className="btn btn-success btn-lg" id="run-button" onClick={updateMarkers}>Run</button>
          )}
          {selectedText && (
            <button className="btn btn-info" id="gpt-button" onClick={() => sendGptMsg(selectedText)}>Ask GPT?</button>
          )}
        </main>
      </div>
    </>
  );
};

export default ImageUpload;
