var cardTileEl = $('#card-tiles');
var previousEl = $('#previous');
var paginationEl = $('#pagination-btns')
var nextEl = $('#next');
var ulRow1 = $('#row-1');
var ulRow2 = $('#row-2');
var ulRow3 = $('#row-3');
var ulRow4 = $('#row-4');
var TMDBApiURL = "https://api.themoviedb.org/3/discover/movie?api_key=c7fa5c32a18aa2a0e3ea8e061504176d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=27&with_watch_monetization_types=flatrate"
var YtApiURL = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CconentDetails%2Cstatistics&id=Ks-_M1QhMc&key=AIzaSyBirNOStHPrCxDe1tUoghEqkGdVgMXq8Vk'
var pageIndex = 1;
var numberOfPages;
var pageParameter = '&page=' + pageIndex;
var currentMovieArray;
var fetchedUrl = YtApiURL;


callApi(fetchedUrl + pageParameter);

function callApi(url) {
  fetch(url)
.then (function (response){
    return response.json()
})
.then (function (data){
    console.log(data.results)
    console.log(data)

    var title = data.original_title;

    numberOfPages = data.total_pages;
    currentMovieArray = data.results;
    pageParameter = '&page=';

    generateCardList(currentMovieArray)
})
}

function generateCardList(movieArray) {
  //create 15 cards that will generate within the cardtilesel

  for (let i = 0; i < movieArray.length; i++) {
    let mainCard = $('<div>');
    mainCard.addClass('card');
    mainCard.attr('id', 'movie')

    let cardImage = $('<div>');
    cardImage.addClass('card-image');

    let cardFigure = $('<figure>');
    cardFigure.addClass('image', 'is-3by4');

    let posterPath = 'https://image.tmdb.org/t/p/original/' + movieArray[i].poster_path;
    let posterImage = $('<img>');
    posterImage.attr('src', posterPath);
    posterImage.attr('alt', movieArray[i].original_title);

    cardFigure.append(posterImage);
    cardImage.append(cardFigure);
    mainCard.append(cardImage);

    let listItem = $('<li>');
    listItem.append(mainCard)
    
    if (i < 5) {
      ulRow1.append(listItem);
    } else if (i < 10) {
      ulRow2.append(listItem);
    } else if (i < 15) {
      ulRow3.append(listItem);
    } else {
      ulRow4.append(listItem);
    }
  }
}

function clearContent() {
  ulRow1.empty();
  ulRow2.empty();
  ulRow3.empty();
  ulRow4.empty();
}

//=============Event Listeners==================
paginationEl.on('click', function(event){ 
  event.preventDefault();
  if (event.target.id == 'previous') {
    if (pageIndex != 1) {
      pageIndex--;
      pageParameter += pageIndex;

      clearContent();
      callApi(fetchedUrl + pageParameter)
      console.log(pageParameter);
    }
  }
  if (event.target.id == 'next') {
    if (pageIndex != numberOfPages) {
      pageIndex++
      pageParameter += pageIndex;

      clearContent();
      callApi(fetchedUrl + pageParameter)
      console.log(pageParameter);
    }
  }
})