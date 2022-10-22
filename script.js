let quoteContainer = document.getElementById("quote-container");
let quoteText = document.getElementById("quote");
let authorText = document.getElementById("author");
let twitterBtn = document.getElementById("twitter");
let newQuoteBtn = document.getElementById("new-quote-button");
let loader = document.getElementById("loader");

// Empty array
let apiQuotes = [];

// Show Loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
  console.log("loading");
};

// Hide Loading
const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Get quotes from API
const getQuotes = async () => {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
};

//pick a random quote from array fetched by getQuotes.
const newQuote = () => {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    authorText.textContent = "Unknow";
  } else authorText.textContent = quote.author;

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else quoteText.classList.remove("long-quote");

  quoteText.textContent = quote.text;
  complete();
};

// tweet the quote function
const tweetQuote = () => {
  const twitterUrl = `https://www.twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
