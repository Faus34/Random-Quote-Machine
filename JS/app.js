let quotesData;

let colors = [
'#6b5b95','#feb236','#d64161','#ff7b25','#d5f4e6','#80ced6','#fefbd8','#618685','#92a8d1','#f7cac9','#f7786b','#82b74b','#ffcc5c'
];

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
  
  $('body').css('background',colors[Math.floor(Math.random() * colors.length)])

  $('#tweet-quote').attr(
    'href', twitterURL
  );

  $('#tumblr-quote').attr(
    'href', tumblrURL
  );

  $('#card-img').attr('src','https://source.unsplash.com/random/300x150'+new Date().getTime())
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