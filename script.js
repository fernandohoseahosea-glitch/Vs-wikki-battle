// @ts-nocheck

const characters = [
  {
    id: "89818",
    title: "Kagura Shiraishi",
    image: "img/Kagura.jpg",
    caption: "Kagura Shiraishi",
    tiers: ["High 1-A"],
    keys: [
      "God",
      "The Shiraishi of Creation",
      "The Voice",
      "The Unknowable/God"
    ],
    name: "God, Kagura, The Shiraishi, God of the Covenant, Elohim, Ain Soph, Monad, Hashem, One True Creator",
    origin: "Clauchou/Shiraishi S",
    gender: "Female",
    age: "100 Trilion",
    classification: "Deity, Supreme God",
    powerScore: 10000,
    powers: [
      {
        title: "Omnipotence, Omnipresence & Omniscience",
        desc: "(Specific applications include: Reality Warping, Conceptual Manipulation, Existence Erasure, Plot Manipulation)"
      },
      {
        title: "Higher-Dimensional Existence & Acausality",
        desc: "(Type 5 - Melampaui hierarki dimensi dan hukum sebab-akibat)"
      }
    ]
  },
  {
    id: "hizkia-shiraishi",
    title: "Hizkia Shiraishi",
    tiers: ["1-A", "High 1-A", "0"],
    keys: ["Base", "Awakened", "True Form"],
    name: "Hizkia Shiraishi",
    origin: "Shiraishi Verse",
    gender: "Male",
    age: "Unknown",
    classification: "Supreme Entity",
    powerScore: 10000,
    powers: []
  }
];

function getSavedChars() {
  try {
    return JSON.parse(localStorage.getItem("vsb_saved_chars") || "[]");
  } catch (e) {
    return [];
  }
}

function setSavedChars(list) {
  try {
    localStorage.setItem("vsb_saved_chars", JSON.stringify(list));
  } catch (e) {}
}

function toggleSaveChar(id) {
  const saved = getSavedChars();
  const idx = saved.indexOf(id);
  if (idx >= 0) {
    saved.splice(idx, 1);
  } else {
    saved.push(id);
  }
  setSavedChars(saved);
  updateSaveButton(id);
}

function updateSaveButton(id) {
  const btn = document.getElementById("saveCharBtn");
  if (!btn) return;
  const isSaved = getSavedChars().includes(id);
  btn.textContent = isSaved ? "SAVED" : "SIGN IN TO SAVE";
  btn.classList.toggle("saved", isSaved);
}

function renderCharacter(c) {
  if (!c) return;

  const pageTitle = document.getElementById("pageTitle");
  const topTitle = document.getElementById("topBarTitle");
  if (pageTitle) pageTitle.textContent = c.title || "";
  if (topTitle) topTitle.textContent = c.title || "VS BATTLES WIKI";

  const charFigure = document.getElementById("charFigure");
  const charImg = document.getElementById("charImg");
  const charCaption = document.getElementById("charCaption");

  if (charFigure && charImg && charCaption) {
    if (c.image) {
      charImg.src = c.image;
      charImg.alt = c.caption || c.title || "";
      charCaption.textContent = c.caption || "";
      charFigure.classList.remove("hidden");
      charImg.onerror = function () {
        charFigure.classList.add("hidden");
      };
    } else {
      charFigure.classList.add("hidden");
    }
  }

  const tierLine = document.getElementById("tierLine");
  const keyLine = document.getElementById("keyLine");
  if (tierLine) {
    tierLine.innerHTML = "<strong>Tier:</strong> " + ((c.tiers && c.tiers.join(" | ")) || "-");
  }
  if (keyLine) {
    keyLine.innerHTML = "<strong>Key:</strong> " + ((c.keys && c.keys.join(" | ")) || "-");
  }

  const infoName = document.getElementById("infoName");
  const infoOrigin = document.getElementById("infoOrigin");
  const infoGender = document.getElementById("infoGender");
  const infoAge = document.getElementById("infoAge");
  const infoClassification = document.getElementById("infoClassification");

  if (infoName) infoName.textContent = c.name || "-";
  if (infoOrigin) infoOrigin.textContent = c.origin || "-";
  if (infoGender) infoGender.textContent = c.gender || "-";
  if (infoAge) infoAge.textContent = c.age || "-";
  if (infoClassification) infoClassification.textContent = c.classification || "-";

  const powersList = document.getElementById("powersList");
  if (powersList) {
    powersList.innerHTML = "";
    (c.powers || []).forEach(function (p) {
      const li = document.createElement("li");
      li.innerHTML = "<strong>" + (p.title || "") + "</strong> " + (p.desc || "");
      powersList.appendChild(li);
    });
  }

  updateSaveButton(c.id);
}

function selectCharacter(id) {
  const found = characters.find(function (item) {
    return item.id === id;
  });
  if (found) {
    renderCharacter(found);
  }
}

function renderCharList(filterText) {
  const container = document.getElementById("charListItems");
  if (!container) return;
  const query = (filterText || "").trim().toLowerCase();
  container.innerHTML = "";

  characters
    .filter(function (c) {
      if (!query) return true;
      return (
        (c.title && c.title.toLowerCase().includes(query)) ||
        (c.origin && c.origin.toLowerCase().includes(query)) ||
        (c.tiers && c.tiers.join(" ").toLowerCase().includes(query))
      );
    })
    .forEach(function (c) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "char-item-btn";
      btn.textContent = c.title;
      btn.addEventListener("click", function () {
        selectCharacter(c.id);
      });
      container.appendChild(btn);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  if (characters.length > 0) {
    renderCharacter(characters[0]);
  }
  renderCharList("");

  const saveBtn = document.getElementById("saveCharBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      if (characters.length > 0) {
        toggleSaveChar(characters[0].id);
      }
    });
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      renderCharList(e.target.value);
    });
  }
});
