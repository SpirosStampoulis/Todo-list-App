import { useState, useEffect } from "react";
import "./QuoteApi.scss";

export default function QuoteApi() {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        const index = Math.floor(Math.random() * data.length);
        setQuote(data[index]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div class='animated-border-quote'>
      <blockquote>
        <p> {quote.text ? quote.text : "Loading..."}</p>
        <cite>{quote.author ? quote.author : "Unknown"}</cite>
      </blockquote>
    </div>
  );
}
