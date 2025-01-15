import React, { useState } from 'react';
import './App.css';
import { FaGalacticSenate, FaPlay, FaSpinner } from 'react-icons/fa';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [uploaded, setUploaded] = useState(true);
  const [id, setId] = useState('')
  const [song, setSong] = useState('');

  const API_ENDPOINT = "Amazon Api Gateway endpoint";

  const uplaodText = () => {
    setIsLoading(true);

    const inputData = {
      "voice": 'Joanna',
      "text": inputValue
    }

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(inputData)
    })
      .then(response => response.json())
      .then(data => {
        const postid = document.getElementById("postIDreturned").textContent = "Post ID: " + data;
        setId(data);
      })
      .catch(error => {
        alert("Error: " + error);
      })
      .finally(e => {
        setIsLoading(false);
        setUploaded(false);
      });

  }

  const playAudioUsingPolly = (postId) => {
    setIsLoadingText(true)
    fetch(API_ENDPOINT + '?postId=' + id, {
      method: 'Get'
    })
      .then(response => response.json())
      .then(response => {
        response.forEach(data => {
          setSong(data['url']);
          setIsLoadingText(false)
        });
      })
  }

  return (
    <div className="container">
      <h1>Text Narrator using Amazom Polly</h1>
      <textarea
        className="input-box"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type here..."
        rows={8}
      />
      <p id='postIDreturned'></p>
      <div className='btns'>
        <button className="submit-button" onClick={uplaodText} disabled={isLoading}>
          {isLoading ? <FaSpinner className="spinner" />  : 'Upload Text'}
        </button>
        <button className="submit-button ply-btn" onClick={playAudioUsingPolly} disabled={uploaded}>
          {isLoadingText ? <FaSpinner className="spinner" /> : <FaPlay className="" /> }
        </button>
      </div>
      <audio src={song} controls autoPlay />

    </div>
  );
}

export default App;
