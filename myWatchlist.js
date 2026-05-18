let myWatchList = JSON.parse(localStorage.getItem("myWatchList")) || [];

render();

async function render() {
  const html = await Promise.all(myWatchList.map(renderCard));
  document.querySelector(".movie-cards-container").innerHTML = html.join("");
}

document.addEventListener("click", (e) => {
  const button = e.target.closest(".add-rmv-button");
  if (button) {
    const rmvId = button.dataset.rmvButton;
    if (myWatchList.includes(rmvId)) {
      myWatchList = myWatchList.filter((id) => id !== rmvId);
      localStorage.setItem("myWatchList", JSON.stringify(myWatchList));
      render();
    }
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
              <button class="add-rmv-button" data-rmv-button=${id}>
                  remove watchlist
              </button>
          </div>
          <p class="resume">
          ${data.Plot}
          </p>
      </div>
  </div>`;
}
