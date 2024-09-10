import React, { useState, useEffect } from 'react';

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
                <h1 class="">Random Quotes!</h1>
                <p>{quote}</p>
                <p>— {author}</p>
        </div>
    );
}

export default App;
