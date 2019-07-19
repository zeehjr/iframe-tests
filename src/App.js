import React, { useState, useEffect, useRef } from "react";
import ReactHTMLParser from "react-html-parser";

function App() {
  // const handleLoad = e => {
  //   const { target } = e;
  //   console.log(target);
  //   const janela = target.contentWindow;

  //   janela.eval(`alert('hellow')`);
  // };

  const myRef = useRef(null);

  const [pageHTML, setPageHTML] = useState("");

  useEffect(() => {
    fetch(
      // "http://localhost:4548/?url=https://docs.google.com/forms/d/e/1FAIpQLScJJvPc4xlmPA2pGd5VIusBzbRok79W1VV_CcDmO6ZQi5aLJw/viewform?embedded=true"
      "http://localhost:4548/?url=https://docs.google.com/forms/d/e/1FAIpQLScJJvPc4xlmPA2pGd5VIusBzbRok79W1VV_CcDmO6ZQi5aLJw/viewform?embedded=true"
      // "http://localhost:4548/formTest"
    ).then(res => {
      console.log(res);
      res.json().then(data => {
        setPageHTML(data.resposta.replace("", ""));
        console.log(data.resposta);
      });
    });
  }, []);

  const elemento = ReactHTMLParser(pageHTML);

  useEffect(() => {
    const form = document.querySelector("#id-form-dinamico form");
    //const form = document.querySelector("#id-form-dinamico form");
    if (form != null) {
      form.onsubmit = e => {
        e.preventDefault();
        alert("submitted");
        console.log(e);
        let values = {};
        e.target.querySelectorAll("input").forEach(input => {
          values[input.name] = input.value;
        });
        console.log(values);
      };
    }
  }, [elemento]);

  if (pageHTML !== "") {
    // console.log();
    // const form = myRef.current.querySelector("form");
    // const childNodes = myRef.current.childNodes;
    // console.log(childNodes);
    // console.log(myRef.current.firstChild);
    // console.log(childNodes.length);
    // if (childNodes.length > 0) {
    // console.log(childNodes[0]);
    // }
  }

  return (
    <div>
      <div id="id-form-dinamico" ref={myRef}>
        {elemento}
      </div>
    </div>
  );
}

export default App;
