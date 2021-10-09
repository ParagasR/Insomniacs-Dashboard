var OMDBApiURL = "http://www.omdbapi.com/?i=tt3896198&apikey=e3bfc809&s=diana"
var TMDBApiURL = "https://api.themoviedb.org/3/discover/movie?api_key=c7fa5c32a18aa2a0e3ea8e061504176d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_watch_monetization_types=flatrate"
var cardTileEl = $('#card-tiles');
var ulRow1 = $('#row-1');
var ulRow2 = $('#row-2');
var ulRow3 = $('#row-3');
var ulRow4 = $('#row-4');


fetch(TMDBApiURL)
.then (function (response){
    return response.json()
})
.then (function (data){
    console.log(data.results)

    generateCardList(data.results)
})

function generateCardList(movieArray) {
  //create 15 cards that will generate within the cardtilesel

  for (let i = 0; i < movieArray.length; i++) {
    let mainCard = $('<div>');
    mainCard.addClass('card');

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
