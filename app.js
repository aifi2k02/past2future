const archiveStories = window.PAST_TO_FUTURE_STORIES || [];

const grid = document.querySelector("#story-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const blueprintDialog = document.querySelector("#blueprint-dialog");
const blueprintTrigger = document.querySelector(".blueprint-zoom-trigger");
const closeBlueprintDialog = document.querySelector(".close-blueprint-dialog");
const blueprintFull = document.querySelector("#blueprint-full");
const zoomControls = document.querySelectorAll(".zoom-control");

function renderStories(filter = "all") {
  const visibleStories = filter === "all"
    ? archiveStories
    : archiveStories.filter((story) => story.category === filter);

  grid.innerHTML = "";

  visibleStories.forEach((story) => {
    const card = document.createElement("a");
    card.className = "story-card";
    card.href = `detail.html?story=${story.slug}`;
    card.innerHTML = `
      <div class="story-visual">
        <img src="${story.image}" alt="${story.title} visual">
      </div>
      <div class="story-body">
        <div class="story-top">
          <span class="story-category">${story.category}</span>
          <span class="story-score">${story.score}</span>
        </div>
        <h3>${story.title}</h3>
        <p>${story.summary}</p>
        <div class="story-footer">
          <span>${story.source}</span>
          <span class="story-status">${story.status}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderStories(button.dataset.filter);
  });
});

if (blueprintTrigger && blueprintDialog) {
  blueprintTrigger.addEventListener("click", () => {
    blueprintFull.dataset.zoom = "1";
    zoomControls.forEach((control) => {
      control.classList.toggle("active", control.dataset.zoom === "1");
    });

    if (typeof blueprintDialog.showModal === "function") {
      blueprintDialog.showModal();
    }
  });
}

if (closeBlueprintDialog && blueprintDialog) {
  closeBlueprintDialog.addEventListener("click", () => blueprintDialog.close());

  blueprintDialog.addEventListener("click", (event) => {
    if (event.target === blueprintDialog) {
      blueprintDialog.close();
    }
  });
}

zoomControls.forEach((control) => {
  control.addEventListener("click", () => {
    blueprintFull.dataset.zoom = control.dataset.zoom;
    zoomControls.forEach((item) => item.classList.toggle("active", item === control));
  });
});

renderStories();
