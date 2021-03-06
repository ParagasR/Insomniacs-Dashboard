// Dom elements
var documentEl = $(document);
var previousEl = $('#previous');
var nextEl = $('#next');
var ulRow1 = $('#row-1');
var ulRow2 = $('#row-2');
var ulRow3 = $('#row-3');
var ulRow4 = $('#row-4');
var modalEl = $('#modal');
var searchBarBtn = $('#search-bar');
var videoPlayerEl = $('#video-player');
var recentListEl = $('#rv-list');

// Api urls
var TMDBApiURL = 'https://api.themoviedb.org/3/discover/movie?api_key=c7fa5c32a18aa2a0e3ea8e061504176d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=27&with_watch_monetization_types=flatrate'
var searchAPIURl = 'https://api.themoviedb.org/3/search/movie?api_key=c7fa5c32a18aa2a0e3ea8e061504176d&language=en-US&include_adult=false';
var YtApiURL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&key=AIzaSyBirNOStHPrCxDe1tUoghEqkGdVgMXq8Vk&q='

//Global variables
var pageIndex = 1;
var numberOfPages;
var pageParameter = '&page=' + pageIndex;
var currentMovieArray;


callApi(TMDBApiURL + pageParameter);
generateListonLoad();

function generateListonLoad() {
  for (var i = 0; i < localStorage.length; i++){
    console.log(JSON.parse(localStorage.getItem(localStorage.key(i))))
    generateListItem(JSON.parse(localStorage.getItem(localStorage.key(i))))
}
}

function callApi(url) {
  fetch(url)
  .then (function (response){
    return response.json();
  })
  .then (function (data){
    numberOfPages = data.total_pages;
    currentMovieArray = data.results;
    pageParameter = '&page=';
    console.log(data)
    generateCardList(currentMovieArray);
  })
}

function generateCardList(movieArray) {
  //create 20 cards that will generate movie details

  for (let i = 0; i < movieArray.length; i++) {
    let mainCard = $('<div>');
    mainCard.addClass('card');
    mainCard.attr('id', 'movie');
    

    let cardImage = $('<div>');
    cardImage.addClass('card-image');

    let cardFigure = $('<figure>');
    cardFigure.addClass('image', 'is-3by4');
    let posterPath
    if (movieArray[i].poster_path != null) {
      posterPath = 'https://image.tmdb.org/t/p/original/' + movieArray[i].poster_path;
    } else {
      posterPath = './assets/image/movie-placeholder.png' //fill in image
    }
    let posterImage = $('<img>');
    posterImage.attr('id', 'movieData');
    posterImage.attr('src', posterPath);
    posterImage.attr('alt', movieArray[i].original_title);
    posterImage.attr('data-title', (movieArray[i].original_title));
    posterImage.attr('data-description', movieArray[i].overview);
    posterImage.attr('data-rating', movieArray[i].vote_average);

    cardFigure.append(posterImage);
    cardImage.append(cardFigure);
    mainCard.append(cardImage);

    let cardTitle = $('<p>');
    cardTitle.text(movieArray[i].original_title);
    cardTitle.attr('style', 'color: red; text-align: center')
    
    let listItem = $('<li>');
    listItem.attr('id', 'card-list-item');
    listItem.append(mainCard);
    listItem.append(cardTitle);
    
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

function generateWindow(movie) {
  //get yt video URL
  //movie title at the top
  //yt video below title
  //overview below the movie

  $('.box h1').text(movie.title);
  $('.box p').text(movie.description);
  $('.box h5').text('Rating: ' + movie.rating + '/10');
  videoPlayerEl.attr('src', movie.url);
  modalEl.addClass('is-active');
}

function generateYTVideo(movie) {
  //take the movie title and append 'trailer' to it
  //take the new string and append to ytAPIURL
  //fetch ytAPIURL and grab video URL
  //return video URL
  let search = createSearchedItem(movie.title);
  //if search is in local storage then generate card from local storage
  //else run fetch then generate card

  console.log(search)
  if (localStorage.getItem(search) != null) {
    console.log(localStorage.getItem(search))
    generateWindow(JSON.parse(localStorage.getItem(search)))
  } else {
    fetch(YtApiURL + search)
    .then (function (response){
      console.log('fetched')
      return response.json()
    })
    .then (function (data) {
      let ytURL =  'https://www.youtube.com/embed/';
      let savedURL = ytURL + data.items[0].id.videoId
      movie.url = savedURL;
      localStorage.setItem(search, JSON.stringify(movie));
      generateWindow(movie);
    })
  }  
}

function createSearchedItem(movieTitle) {
  returnedSearch = movieTitle + " trailer";
  searchArray = returnedSearch.split('');
  for (let i = 0; i < searchArray.length; i++) {
    if (searchArray[i] === "'") {
      searchArray[i] = "%27";
    } else if ((returnedSearch[i] === ' ')) {
      searchArray[i] = "%20";
    }
  }
  return searchArray.join('');
}

function generateListItem(movie) {
  let recentItem = $('<li>');
  recentItem.attr('id', 'recent-item');
  recentItem.text(movie.title);
  recentItem.addClass('is-underlined');
  recentListEl.append(recentItem);
  return;
}

//=============Event Listeners==================
documentEl.on('click', function(event){ 
  event.preventDefault();
  if (event.target.id == 'previous') {
    if (pageIndex != 1) {
      pageIndex--;

      clearContent();
      callApi(TMDBApiURL + (pageParameter + pageIndex))

    }
  }
  if (event.target.id == 'next') {
    if (pageIndex != numberOfPages) {
      pageIndex++

      clearContent();
      callApi(TMDBApiURL + (pageParameter + pageIndex))
    }
  }
  if (event.target.id === 'close') {
    modalEl.removeClass('is-active');
  }
  if (event.target.id === 'recent-item') {
    let x = createSearchedItem(event.target.textContent)
    let storedMovie = JSON.parse(localStorage.getItem(x))
    generateWindow(storedMovie);
  }
})

$('#card-tiles ul').on('click', function(event){
  event.preventDefault();
  //retreive movie title and overview
  //save movie title to local storage
  //update recently viewed list
  //call function to update list
  let movieObj = {
    title: $(event.target).data('title'),
    description: $(event.target).data('description'),
    rating: $(event.target).data('rating')
  }

  if (recentListEl.children().length === 0) {
    generateListItem(movieObj);
  } else {
    let createLi = true;
    
    for (let i = 0; i < recentListEl.children().length; i++) {
      if (movieObj.title === recentListEl.children()[i].textContent) {
        createLi = false;
        break;
      } 
    }

    if (createLi) {
      generateListItem(movieObj);
    }
  }
  generateYTVideo(movieObj);
})

searchBarBtn.on('click', function(event){
  event.preventDefault();
  pageIndex = 1;
  clearContent();
  callApi(searchAPIURl + "&query=" + $('#input-value')[0].value + pageParameter);
})