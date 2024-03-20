import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [languageArray, setLanguageArray] = useState([]);
  const [data, setData] = useState("");
  const [result, setResult] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("hi");

  useEffect(()=>{
    async function Languages(){
   

      const options = {
        method: 'GET',
        url: 'https://text-translator2.p.rapidapi.com/getLanguages',
        headers: {
          'X-RapidAPI-Key': '754a265ba9mshfd05fff82906f21p187a20jsn1735a8cee9f4',
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        // console.log(response.data.data.languages);
        const languages = response.data.data.languages;
        
        setLanguageArray(languages);
        console.log(languageArray);
      } catch (error) {
        console.error(error);
      }
        }
      
        Languages();
  }, [])


  async function getTranslatedData() {
    try {
      // to convert from string to encoded format we use URLSearchParams
      const encodeData = new URLSearchParams();
      // append the data with key and value
      encodeData.set("source_language", sourceLanguage);
      encodeData.set("target_language", targetLanguage);
      encodeData.set("text", data);

      const option = {
        method: "post",
        url: "https://text-translator2.p.rapidapi.com/translate",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "754a265ba9mshfd05fff82906f21p187a20jsn1735a8cee9f4",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        data: encodeData, // payload // request body
      };
      const res = await axios.request(option);
      setResult(res.data.data.translatedText);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>Translator</h1>
      <div className="select-container">
        <label htmlFor="Source Language">From:</label>
      <select
        name="source"
        onChange={(e) => {
          setSourceLanguage(e.target.value);
        }}
        value={sourceLanguage}
      >

        {languageArray.map((language)=>(
          <option key={language.code} value={language.code}>{language.name}</option>
        ))}
        {/* <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
        <option value="ml">Malayalam</option>
        <option value="ta">Tamil</option> */}
      </select>
      <br />
      <label htmlFor="Target Language">To: </label>
      <select
        name="target"
        onChange={(e) => {
          setTargetLanguage(e.target.value);
        }}
        value={targetLanguage}
      >
        {languageArray.map((language)=>(
          <option key={language.code} value={language.code}>{language.name}</option>
        ))}
      </select>
      </div>
      <br />
      <textarea className="input"
        name="data"
        placeholder="Enter data here"
        onChange={(e) => {
          setData(e.target.value);
        }}>
        
      </textarea>
      {/* <input id="input"
        name="data"
        placeholder="Enter data here"
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
      <br /> */}
      <button onClick={getTranslatedData} id="button">translate</button>
      <br />

      <div id="result">
      <p>{result}</p>
      </div>
    </div>
  );
}

export default App;