const detailTitle = document.querySelector("#detail-title");
const detailEyebrow = document.querySelector("#detail-eyebrow");
const detailIntro = document.querySelector("#detail-intro");
const detailImage = document.querySelector("#detail-image");
const detailMetaStrip = document.querySelector("#detail-meta-strip");
const detailThen = document.querySelector("#detail-then");
const detailNow = document.querySelector("#detail-now");
const detailCheck = document.querySelector("#detail-check");
const detailScoreValue = document.querySelector("#detail-score-value");
const relatedGrid = document.querySelector("#related-grid");

const params = new URLSearchParams(window.location.search);
const storySlug = params.get("story");
const story = window.getPastToFutureStoryBySlug(storySlug) || window.PAST_TO_FUTURE_STORIES[0];

document.title = `${story.title} | Past to Future`;

detailEyebrow.textContent = story.detailEyebrow;
detailTitle.textContent = story.detailTitle;
detailIntro.textContent = story.detailIntro;
detailImage.src = story.image;
detailImage.alt = `${story.title} visual blueprint`;
detailThen.textContent = story.then;
detailNow.textContent = story.now;
detailCheck.textContent = story.check;
detailScoreValue.textContent = story.score.split("/")[0];

detailMetaStrip.innerHTML = `
  <div><span>Source</span><strong>${story.source}</strong></div>
  <div><span>Category</span><strong>${story.category}</strong></div>
  <div><span>Status</span><strong>${story.status}</strong></div>
  <div><span>Close score</span><strong>${story.score}</strong></div>
`;

window.PAST_TO_FUTURE_STORIES
  .filter((item) => item.slug !== story.slug)
  .slice(0, 4)
  .forEach((item) => {
    const card = document.createElement("a");
    card.className = "story-card";
    card.href = `detail.html?story=${item.slug}`;
    card.innerHTML = `
      <div class="story-visual">
        <img src="${item.image}" alt="${item.title} visual">
      </div>
      <div class="story-body">
        <div class="story-top">
          <span class="story-category">${item.category}</span>
          <span class="story-score">${item.score}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <div class="story-footer">
          <span>${item.source}</span>
          <span class="story-status">${item.status}</span>
        </div>
      </div>
    `;
    relatedGrid.appendChild(card);
  });
