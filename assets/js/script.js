var OMDBApiURL = "http://www.omdbapi.com/?i=tt3896198&apikey=e3bfc809&s=diana";
var TMDBApiURL =
  "https://api.themoviedb.org/3/movie/550?api_key=c7fa5c32a18aa2a0e3ea8e061504176d";

fetch(TMDBApiURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
