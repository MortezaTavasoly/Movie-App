const API_URL: string =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a0814a81d9e0ea8e164320078c18b3cb&page=1";

const IMG_PATH: string = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API: string =
  'https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="';

const list = document.querySelector(".content") as HTMLDivElement;
const search = document.querySelector(".search") as HTMLInputElement;
const form = document.querySelector("#form") as HTMLFormElement;
const searchBtn = document.querySelector(".search-btn") as HTMLImageElement;

const req = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const getMovies = (url: string) => {
  req(url)
    .then((e) => {
      if (e.results.length !== 0) {
        search.value = ``;
        list.innerHTML = ``;
        const movies = e.results;
        movies.map((movie: any) => {
          const template = document.createElement("div");
          const vote: number = movie.vote_average;
          const rateCol = (): string => {
            if (vote < 6) {
              return "red";
            } else if (vote >= 6 && vote < 7) {
              return "orange";
            } else if (vote >= 7 && vote < 8) {
              return "yellow";
            } else {
              return "#00ff0d";
            }
          };

          template.className = "movie";
          template.innerHTML = `
            <div class="img-disc">
              <img
                src=${IMG_PATH + movie.poster_path}
                alt="movie-image"
              />
              <div class="discription">
              <h4>Overview</h4>
                <p>${movie.overview.substring(0, 250)}... </p>
              </div>
            </div>
            <div class="details">
              <h4 class="title">${movie.title}</h4>
              <h4 class="rate" style="color:${rateCol()};">${
            movie.vote_average
          }</h4>
            </div>
       `;

          list.appendChild(template);
        });
      } else {
        search.value = "";
        list.innerHTML = `<h2>Not Found!</h2>`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

searchBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  const url: string = SEARCH_API + search.value;
  getMovies(url);
});

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const url: string = SEARCH_API + search.value;
  getMovies(url);
});

getMovies(API_URL);
