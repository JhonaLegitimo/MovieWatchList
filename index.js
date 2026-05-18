const form = document.querySelector("form");
const moviesSearched = [];
const myWatchList = JSON.parse(localStorage.getItem("myWatchList")) || [];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const search = data.get("search-movie").toLowerCase();
  if (search) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=27ddec2c&s=${search}&type=movie`,
    );
    const data = await res.json();
    data.Search.forEach((obj) => {
      moviesSearched.push(obj.imdbID);
    });
    const html = await Promise.all(moviesSearched.map(renderCard));
    document.querySelector(".movie-cards-container").innerHTML = html.join("");
  }
});

document.addEventListener("click", (e) => {
  const button = e.target.closest(".add-rmv-button");
  if (button) {
    const id = button.dataset.addButton;
    if (!myWatchList.includes(id)) {
      myWatchList.push(id);
      localStorage.setItem("myWatchList", JSON.stringify(myWatchList));
    }
    console.log(myWatchList);
  }
});

async function renderCard(id) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=27ddec2c&i=${id}`);
  const data = await res.json();
  return `
  <div class="movie-card">
      <img
          class="movie-poster"
          src="${data.Poster}"
      />
      <div class="movie-content">
          <div class="title-rating">
              <h2>${data.Title}</h2>
              <p>9.0</p>
          </div>
          <div class="info-add-rmv-button">
              <p>${data.Runtime}</p>
              <p>${data.Genre}</p>
              <button class="add-rmv-button" data-add-button=${id}>
                  Add watchlist
              </button>
          </div>
          <p class="resume">
          ${data.Plot}
          </p>
      </div>
  </div>`;
}
