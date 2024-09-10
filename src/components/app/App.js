import React, { useState, useEffect } from 'react';

import './app.scss';

const App = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [colorIndex, setColorIndex] = useState("0");

    const colors = ['#B0E0E6', '#AFEEEE', '#ADD8E6', '#B0C4DE', '#E6CFE6'];

    const getData = (url) => {
        const callbackName = 'jsonpCallback_' + Math.floor(Math.random() * 1000000);

        window[callbackName] = (data) => {
            setQuote(data.quoteText);
            setAuthor(data.quoteAuthor || "Автор неизвестен");

            delete window[callbackName];
            document.body.removeChild(script);
        };

        const script = document.createElement('script');
        script.src = `${url}&jsonp=${callbackName}`;
        document.body.appendChild(script);
    };

    const getRandColor = () => {
        const nextIndex = (colorIndex + 1) % colors.length;
        setColorIndex(nextIndex);

        const newColor = colors[nextIndex];
        document.documentElement.style.setProperty('--bg-color', newColor);
    };

    useEffect(() => {
        getData("https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru");
    }, []);

    const getNewQuote = () => {
        getData("https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru");
        getRandColor();
    }

    return (
        <div className="App">
            <div className="container">
                <h1 className="text-primary">Random Quotes!</h1>
                <p className="quote">{quote}</p>
                <p className="author">— {author}</p>
                <button 
                    className="btn"
                    onClick={() => getNewQuote()}
                >New Quote</button>
            </div> 
        </div>
    );
}

export default App;
