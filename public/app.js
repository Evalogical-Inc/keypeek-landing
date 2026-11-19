// Copy buttons: each button points at the element holding the text via data-copy="#id".
for (const btn of document.querySelectorAll("[data-copy]")) {
  btn.addEventListener("click", async () => {
    const text = document.querySelector(btn.dataset.copy)?.textContent.trim() ?? "";
    const label = btn.textContent;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copied";
    } catch {
      btn.textContent = "Press Ctrl+C";
      const r = document.createRange();
      r.selectNodeContents(document.querySelector(btn.dataset.copy));
      getSelection().removeAllRanges();
      getSelection().addRange(r);
    }
    setTimeout(() => (btn.textContent = label), 1600);
  });
}

// Tabs: WAI-ARIA tab pattern, arrow keys move between tabs.
for (const list of document.querySelectorAll('[role="tablist"]')) {
const tabs = [...list.querySelectorAll('[role="tab"]')];
const select = (tab) => {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute("aria-selected", on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  }
};
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => select(tab));
  tab.addEventListener("keydown", (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    const to = step ? tabs[(i + step + tabs.length) % tabs.length] : e.key === "Home" ? tabs[0] : e.key === "End" ? tabs.at(-1) : null;
    if (!to) return;
    e.preventDefault();
    select(to);
    to.focus();
  });
});
}

// Hero demo: a simulated scan of a fake machine. The fake key is assembled here so no
// secret-shaped string sits in the page source.
const keyEl = document.getElementById("key");
const out = document.getElementById("out");
const replay = document.getElementById("replay");

if (keyEl && out && replay) {
  keyEl.textContent = "sk-" + "d3m0".repeat(9);
  const lines = out.innerHTML.split("\n"); // final report is in the HTML, so no-JS visitors see it
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timers = [];

  const showFinal = () => {
    out.innerHTML = lines.join("\n");
    keyEl.classList.add("found");
    replay.disabled = false;
  };

  const run = () => {
    timers.forEach(clearTimeout);
    timers = [];
    if (reduced) return showFinal();
    replay.disabled = true;
    keyEl.classList.remove("found");
    out.innerHTML = "";
    timers.push(setTimeout(() => keyEl.classList.add("found"), 700));
    lines.forEach((line, i) => {
      timers.push(setTimeout(() => (out.innerHTML = lines.slice(0, i + 1).join("\n")), 1300 + i * 130));
    });
    timers.push(setTimeout(() => (replay.disabled = false), 1300 + lines.length * 130));
  };

  replay.addEventListener("click", run);
  run();
}
