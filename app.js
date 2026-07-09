const stories = [
  {
    title: "Knight Rider's KITT",
    source: "Knight Rider, 1982",
    category: "AI",
    status: "Mostly Real",
    score: "8/10",
    image: "assets/kitt-ai-xray.jpeg",
    summary: "An AI car that talks, drives, senses danger, and responds to its driver.",
    then: "KITT was imagined as a smart car with a voice, independent driving, threat detection, and a strong personality.",
    now: "Modern vehicles include driver assist, voice control, emergency braking, route intelligence, parking assist, cameras, radar, and connected software.",
    check: "Many pieces are real, but they are not yet combined into one fully human-like car that can safely operate everywhere."
  },
  {
    title: "Jurassic Park De-Extinction",
    source: "Jurassic Park, 1993",
    category: "DNA",
    status: "Partly Real",
    score: "6/10",
    image: "assets/dire-wolf-deextinction-blueprint.jpeg",
    summary: "Ancient DNA and gene editing moved extinct-animal revival from fiction into real debate.",
    then: "The story imagined extinct animals brought back from ancient genetic material.",
    now: "Researchers have compared ancient dire wolf DNA with living canids and used gene editing to create gray wolves with selected dire-wolf-like traits.",
    check: "Dinosaurs are not back, and experts debate how close these animals are to true extinct species. Current work is better described as proxy animals with selected ancient traits."
  },
  {
    title: "Woolly Mammoth Revival",
    source: "Ice age imagination",
    category: "DNA",
    status: "In Progress",
    score: "7/10",
    image: "assets/deextinction-dna-blueprint.jpeg",
    summary: "Asian elephant DNA is being edited toward mammoth-like cold-weather traits.",
    then: "People imagined ancient extinct animals walking the earth again.",
    now: "Researchers are working on mammoth-like traits such as thick hair, cold adaptation, fat storage, smaller ears, and cold-resistant blood.",
    check: "The likely result would be a mammoth-like elephant, not a perfect original woolly mammoth."
  },
  {
    title: "Star Trek Communicator",
    source: "Star Trek, 1966",
    category: "Communication",
    status: "Real Today",
    score: "10/10",
    image: "assets/communicator-mobile-blueprint.jpeg",
    summary: "Small wireless communication became normal life.",
    then: "A handheld device gave crew members instant voice contact across distance.",
    now: "Smartphones, smartwatches, wireless earbuds, satellite messaging, and mobile video calls are everywhere.",
    check: "This is one of the clearest examples of sci-fi becoming daily reality."
  },
  {
    title: "Iron Man's Jarvis",
    source: "Iron Man, 2008",
    category: "AI",
    status: "Mostly Real",
    score: "8/10",
    image: "assets/ai-assistant-jarvis-blueprint.jpeg",
    summary: "A personal AI assistant that understands, answers, and helps with complex tasks.",
    then: "Jarvis managed systems, responded naturally, and helped Tony Stark think and build.",
    now: "ChatGPT, Siri, Alexa, Google Assistant, Microsoft Copilot, smart homes, and AI work tools handle many assistant tasks.",
    check: "Today's AI is powerful, but it is not yet one perfect household, vehicle, and lab intelligence."
  },
  {
    title: "Back to the Future Video Calls",
    source: "Back to the Future Part II, 1989",
    category: "Communication",
    status: "Real Today",
    score: "10/10",
    image: "assets/video-call-blueprint.jpeg",
    summary: "Big-screen home video calls became ordinary.",
    then: "The film showed people speaking face to face through large home screens.",
    now: "Zoom, FaceTime, Teams, WhatsApp video, smart TVs, tablets, and conference rooms made this normal.",
    check: "The prediction landed almost completely, though the exact screens changed."
  },
  {
    title: "Minority Report Gesture Screens",
    source: "Minority Report, 2002",
    category: "Immersive",
    status: "Partly Real",
    score: "7/10",
    summary: "Moving screens with hand gestures became touch, motion, VR, and AR control.",
    then: "Characters moved data across giant displays using hand movements in the air.",
    now: "Touchscreens, VR hand tracking, AR interfaces, motion sensors, and gesture controls exist today.",
    check: "Gesture control works in certain settings, but it has not replaced normal screens and keyboards."
  },
  {
    title: "The Jetsons Robot Helper",
    source: "The Jetsons, 1962",
    category: "Home",
    status: "Partly Real",
    score: "6/10",
    summary: "Home robots moved from cartoon comedy to daily household tools.",
    then: "Rosie the robot handled chores and household help.",
    now: "Robot vacuums, smart speakers, delivery robots, warehouse robots, and early humanoid robots handle pieces of the dream.",
    check: "Helpful robots exist, but a complete all-purpose home helper is still developing."
  },
  {
    title: "Spy Movie Biometrics",
    source: "Classic spy fiction",
    category: "AI",
    status: "Real Today",
    score: "9/10",
    summary: "Fingerprints, face scans, and eye scans became everyday security.",
    then: "Secret bases and spies used body-based identity checks.",
    now: "Phones, airports, offices, banks, and security systems use fingerprints, face unlock, and other biometric checks.",
    check: "The core idea is real, although privacy and misuse concerns are serious."
  },
  {
    title: "Star Wars Holograms",
    source: "Star Wars, 1977",
    category: "Immersive",
    status: "Partly Real",
    score: "5/10",
    summary: "Projected 3D people inspired AR, VR, and telepresence experiments.",
    then: "Characters appeared as glowing 3D messages and remote presences.",
    now: "AR, VR, volumetric displays, hologram-style concerts, and 3D telepresence are real in limited forms.",
    check: "We have impressive versions, but the simple everyday floating hologram call is not common yet."
  }
];

const grid = document.querySelector("#story-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const dialog = document.querySelector("#story-dialog");
const closeDialog = document.querySelector("#story-dialog .close-dialog");
const blueprintDialog = document.querySelector("#blueprint-dialog");
const blueprintTrigger = document.querySelector(".blueprint-zoom-trigger");
const closeBlueprintDialog = document.querySelector(".close-blueprint-dialog");
const blueprintFull = document.querySelector("#blueprint-full");
const zoomControls = document.querySelectorAll(".zoom-control");

const dialogFields = {
  source: document.querySelector("#dialog-source"),
  title: document.querySelector("#dialog-title"),
  meta: document.querySelector("#dialog-meta"),
  then: document.querySelector("#dialog-then"),
  now: document.querySelector("#dialog-now"),
  check: document.querySelector("#dialog-check")
};

function renderStories(filter = "all") {
  const visibleStories = filter === "all"
    ? stories
    : stories.filter((story) => story.category === filter);

  grid.innerHTML = "";

  visibleStories.forEach((story) => {
    const card = document.createElement("button");
    card.className = "story-card";
    card.type = "button";
    card.innerHTML = `
      ${story.image ? `
        <div class="story-visual">
          <img src="${story.image}" alt="${story.title} visual">
        </div>
      ` : ""}
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
    card.addEventListener("click", () => openStory(story));
    grid.appendChild(card);
  });
}

function openStory(story) {
  dialogFields.source.textContent = story.source;
  dialogFields.title.textContent = story.title;
  dialogFields.then.textContent = story.then;
  dialogFields.now.textContent = story.now;
  dialogFields.check.textContent = story.check;
  dialogFields.meta.innerHTML = `
    <span>${story.category}</span>
    <span>${story.status}</span>
    <span>${story.score}</span>
  `;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderStories(button.dataset.filter);
  });
});

closeDialog.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

blueprintTrigger.addEventListener("click", () => {
  blueprintFull.dataset.zoom = "1";
  zoomControls.forEach((control) => {
    control.classList.toggle("active", control.dataset.zoom === "1");
  });

  if (typeof blueprintDialog.showModal === "function") {
    blueprintDialog.showModal();
  }
});

closeBlueprintDialog.addEventListener("click", () => blueprintDialog.close());

blueprintDialog.addEventListener("click", (event) => {
  if (event.target === blueprintDialog) {
    blueprintDialog.close();
  }
});

zoomControls.forEach((control) => {
  control.addEventListener("click", () => {
    blueprintFull.dataset.zoom = control.dataset.zoom;
    zoomControls.forEach((item) => item.classList.toggle("active", item === control));
  });
});

renderStories();
