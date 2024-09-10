import React, { useState, useEffect } from 'react';

import './app.scss';

const App = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

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

    useEffect(() => {
        getData("https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru");
    }, []);

    return (
        <div className="App">
            <div className="container">
                <h1 className="text-primary">Random Quotes!</h1>
                <p className="quote">{quote}</p>
                <p className="author">— {author}</p>
                <button 
                    className="btn"
                    onClick={() => getData("https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru")}
                >New Quote</button>
            </div> 
        </div>
    );
}

export default App;
