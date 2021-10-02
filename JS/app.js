let quotesData;

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url:
  'https://gist.githubusercontent.com/Faus34/410314a4bd1c37cf6f751f3b7faecb9f/raw/e793032e5b3e49d1c1b466bfda751f593530f5c6/RandomQuotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        //console.log('quotesData');
        //console.log(quotesData);
      }
    }
  });
}

function getRandomQuote(){
  let randomQuote = quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
  const quote = randomQuote.quote;
  const author = randomQuote.author;
  setQuote(quote,author);
  
  const twitterURL = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + quote + '" ' + author);
  
  const tumblrURL = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+ encodeURIComponent(author)+'&content='+encodeURIComponent(quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button';
  
  $('#tweet-quote').attr(
    'href', twitterURL
  );

  $('#tumblr-quote').attr(
    'href', tumblrURL
  );
};

function setQuote(quote,author){
  $("#textSpace").html(quote);
  $("#author").html(author);
}

$(document).ready(function(){
  getQuotes().then(()=>{
    getRandomQuote();
  });
  
  $('#new-quote').on('click', getRandomQuote);
});