/* import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
  return (
<div className="main">
<div className="nav">
    <p>AI BOT</p>
    <img src={assets.user_icon} alt="" />
</div>
<div className="main-container">
    <div className="greet">
        <p><span>hello,dev</span></p>
        <p>how can i help you today?</p>
    </div>

    <div className="main-bottom">
        <div className="search-box">
            <input type="text" placeholder='Enter a prompt here' />
            <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <img src={assets.send_icon} alt="" />
            </div>
        </div>
        <p className='bottom-info'>
AI BOT may display inccaurate info so be careful
        </p>
    </div>
</div>
</div>
  )
}

export default Main */


/* import React, { useState } from 'react'

import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [error, setError] = useState(null)

  const getSentimentColor = (sentiment) => {
    const colors = {
      'Very Negative': '#ff4444',
      'Negative': '#ff8800',
      'Neutral': '#ffbb33',
      'Positive': '#00C851',
      'Very Positive': '#007E33'
    };
    return colors[sentiment] || '#333';
  };

  const analyzeSentiment = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) throw new Error('Analysis failed');
      
      const result = await response.json();
      
      setMessages(prev => [...prev, {
        text: input,
        result: result,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      setInput('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      analyzeSentiment();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Sentiment Analysis Bot</p>
        <img src={assets.user_icon} alt="" />
      </div>
      
      <div className="main-container">
        {messages.length === 0 ? (
          <div className="greet">
            <p><span>Hello, dev</span></p>
            <p>Enter some text to analyze its sentiment</p>
          </div>
        ) : (
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <div className="user-message">
                  <img src={assets.user_icon} alt="" className="message-avatar" />
                  <p>{message.text}</p>
                  <span className="timestamp">{message.timestamp}</span>
                </div>
                <div className="bot-message">
                  <img src={assets.bot_icon} alt="" className="message-avatar" />
                  <div className="sentiment-result">
                    <p style={{ color: getSentimentColor(message.result.sentiment) }}>
                      {message.result.sentiment}
                    </p>
                    <div className="confidence-bars">
                      {message.result.confidence_scores.map((score, idx) => (
                        <div key={idx} className="confidence-bar">
                          <div className="bar-label">
                            {['Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive'][idx]}
                          </div>
                          <div className="bar-container">
                            <div 
                              className="bar-fill"
                              style={{ 
                                width: `${score * 100}%`,
                                backgroundColor: getSentimentColor(
                                  ['Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive'][idx]
                                )
                              }}
                            />
                          </div>
                          <div className="bar-percentage">{(score * 100).toFixed(1)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder='Enter text to analyze sentiment'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img 
                src={assets.send_icon} 
                alt="Send"
                onClick={analyzeSentiment}
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
              />
            </div>
          </div>
          {error && <p className='error-message'>{error}</p>}
          <p className='bottom-info'>
            AI BOT may display inaccurate info, please verify important results
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main */

/* 
import React, { useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';

const Main = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeSentiment = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8930/api/analyze', { // Update the port here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const result = await response.json();

      setMessages(prev => [...prev, {
        text: input,
        sentiment: result.sentiment,
        confidenceScores: result.confidence_scores,
        timestamp: new Date().toLocaleTimeString()
      }]);

      setInput('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      analyzeSentiment();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>AI BOT</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        <div className="greet">
          <p><span>Hello, dev</span></p>
          <p>How can I help you today?</p>
        </div>

        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <div className="user-message">
                <p>{message.text}</p>
                <span className="timestamp">{message.timestamp}</span>
              </div>
              <div className="bot-message">
                <p>Sentiment: {message.sentiment}</p>
                <div className="confidence-bars">
                  {message.confidenceScores.map((score, idx) => (
                    <div key={idx} className="confidence-bar">
                      <div className="bar-label">
                        {['Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive'][idx]}
                      </div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill"
                          style={{ 
                            width: `${score * 100}%`,
                            backgroundColor: ['#ff4444', '#ff8800', '#ffbb33', '#00C851', '#007E33'][idx]
                          }}
                        />
                      </div>
                      <div className="bar-percentage">{(score * 100).toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder='Enter a prompt here'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img 
                src={assets.send_icon} 
                alt="Send"
                onClick={analyzeSentiment}
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
              />
            </div>
          </div>
          {error && <p className='error-message'>{error}</p>}
          <p className='bottom-info'>
            AI BOT may display inaccurate info, please verify important results.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main */



import React, { useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [error, setError] = useState(null)

  const getSentimentColor = (sentiment) => {
    const colors = {
      'Very Negative': '#ff4444',
      'Negative': '#ff8800',
      'Neutral': '#ffbb33',
      'Positive': '#00C851',
      'Very Positive': '#007E33'
    };
    return colors[sentiment] || '#333';
  };

  const analyzeSentiment = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) throw new Error('Analysis failed');
      //code test
      const result = await response.json();
      
      setMessages(prev => [...prev, {
        text: input,
        result: result,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      setInput('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      analyzeSentiment();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Sentiment Analysis Bot</p>
        <img src={assets.user_icon} alt="" />
      </div>
      
      <div className="main-container">
        {messages.length === 0 ? (
          <div className="greet">
            <p><span>Hello, dev</span></p>
            <p>Enter some text to analyze its sentiment</p>
          </div>
        ) : (
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <div className="user-message">
                  <img src={assets.user_icon} alt="" className="message-avatar" />
                  <p>{message.text}</p>
                  <span className="timestamp">{message.timestamp}</span>
                </div>
                <div className="bot-message">
                  <img src={assets.bot_icon} alt="" className="message-avatar" />
                  <div className="sentiment-result">
                    <p style={{ color: getSentimentColor(message.result.sentiment) }}>
                      {message.result.sentiment}
                    </p>
                    <div className="confidence-bars">
                      {message.result.confidence_scores.map((score, idx) => (
                        <div key={idx} className="confidence-bar">
                          <div className="bar-label">
                            {['Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive'][idx]}
                          </div>
                          <div className="bar-container">
                            <div 
                              className="bar-fill"
                              style={{ 
                                width: `${score * 100}%`,
                                backgroundColor: getSentimentColor(
                                  ['Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive'][idx]
                                )
                              }}
                            />
                          </div>
                          <div className="bar-percentage">{(score * 100).toFixed(1)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder='Enter text to analyze sentiment'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img 
                src={assets.send_icon} 
                alt="Send"
                onClick={analyzeSentiment}
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
              />
            </div>
          </div>
          {error && <p className='error-message'>{error}</p>}
          <p className='bottom-info'>
            AI BOT may display inaccurate info, please verify important results
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main