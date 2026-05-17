const form = document.querySelector("form");
const moviesSearched = [];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const search = data.get("search-movie").toLowerCase();
  if (search) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=27ddec2c&s=${search}`,
    );
    const data = await res.json();
    data.Search.forEach((obj) => {
      moviesSearched.push(obj.imdbID);
    });
    const html = await Promise.all(moviesSearched.map(renderCard));
    document.querySelector(".movie-cards-container").innerHTML = html;
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-rmv-button")) {
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
              <button class="add-rmv-button">
                  Add watchlist
              </button>
          </div>
          <p class="resume">
          ${data.Plot}
          </p>
      </div>
  </div>`;
}
