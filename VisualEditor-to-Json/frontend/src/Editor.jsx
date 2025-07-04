import React, { useEffect, useRef } from "react"; //importing neccessary hooks
import EditorJS from "@editorjs/editorjs"; // importing core editor.js library

import Header from "@editorjs/header"; // header block tool from editor.js
import List from "@editorjs/list"; // List Block tool from Editor.js
import Code from "@editorjs/code"; // Code Block tool from Editor.js

const Editor = ({ onSave }) => {
  const editorRef = useRef(null); // initialized the useRef Hook

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List,
          code: Code,
        },
        data: {
          blocks: [],
        },
      });
     }
// This is a cleanup function. React runs this when the component is unmounted or re-initialized.
    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSave = async () => {
    const data = await editorRef.current.save(); 
    // call the save method from Editor.js which returns a JSON Object of what was currently typed in the editor
    console.log("Editor JSON:", data);

    // res function sends the JSON to Backend via HTTP POST to /save
    const res = await fetch("http://localhost:5000/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // tells the backend, JSON file is being sent
      body: JSON.stringify(data), // converts JSON object into strings because HTTP requests can only send data as text over the wire
    });

    const result = await res.json();
    alert("Saved to backend!");
    console.log(result);
  };

  return (
    <div>
      <div id="editorjs" />
      <button onClick={handleSave} style={{ marginTop: "20px" }}>
        Save
      </button>
    </div>
  );
};

export default Editor;
