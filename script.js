const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author-text');
const twitterBtn = document.getElementById('twitter-button');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loader
let showLoader = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

// Hide Loader
let removeLoader = () => {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
};

// Get quote from API
let getQuote = async () => {
    showLoader();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL =
        'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        // If Author is blank, return <Unknown>'
        if (data.quoteAuthor === '') {
            authorText.innerText = ' - <Unknown>';
        } else {
            authorText.innerText = ' - ' + data.quoteAuthor;
        }

        // console.log('Length: ', data.quoteText.length);
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        // authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;

        // console.log('Data: ', data);
        // Stop Loader and show quote
        removeLoader();
    } catch (error) {
        getQuote();
        // console.log('Error, No Quote', error);
    }
};

// Tweet Quote
let tweetQuote = () => {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
};

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load Get Quote
getQuote();
