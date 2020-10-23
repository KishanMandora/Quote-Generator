const container = document.querySelector("#container");
const quote = document.querySelector("#quote");
const auth = document.querySelector("#author");
const twitter = document.querySelector("#twitter");
const generate = document.querySelector("#generate");
const loader = document.querySelector("#loader");
// get quote

async function getQuote() {
    loading();
    const proxy = 'https://whispering-tor-04671.herokuapp.com/';
    const api = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const get = await fetch(proxy + api);
        const result = await get.json();
        // small font for quotw text
        if (result.quoteText.length > 120) {
            quote.classList.add("long-txt");
        } else {
            quote.classList.remove("long-txt");
        }
        quote.innerText = result.quoteText;

        // if author is unknown
        if (result.quoteAuthor === "") {
            auth.innerText = "Anonymous";
        }
        else {
            auth.innerText = result.quoteAuthor;
        }
        endLoad();
    }

    catch (err) {
        getQuote();
        console.log("whoops something gone wrong", err);
    }
}

// twitt function
function twittIt() {
    const tweetQuote = quote.innerText;
    const tweetAuth = auth.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet/?text=${tweetQuote}  -  ${tweetAuth}`;
    window.open(tweetUrl, "_blank");
}

// loading function
function loading() {
    loader.hidden = false;
    container.hidden = true;
}

function endLoad() {
    if (!loader.hidden) {
        container.hidden = false;
        loader.hidden = true;
    }
}


// event Listners 
generate.addEventListener("click", getQuote);;
twitter.addEventListener("click", twittIt);
getQuote();