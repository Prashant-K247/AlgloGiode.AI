let currentUrl = location.href;
const BACKEND_URL = "http://localhost:5000/ai";

let sidebarVisible = false;

const toggleBtn = document.createElement("button");
toggleBtn.innerText = "AI-Mentor";
toggleBtn.style.position = "fixed";
toggleBtn.style.bottom = "20px";
toggleBtn.style.right = "20px";
toggleBtn.style.zIndex = "9999";
toggleBtn.style.background = "#bdbdbd";
toggleBtn.style.color = "Black";
toggleBtn.style.border = "none";
toggleBtn.style.borderRadius = "5%";
toggleBtn.style.width = "100px";
toggleBtn.style.height = "50px";
toggleBtn.style.fontWeight = "bold";
toggleBtn.style.cursor = "pointer";
toggleBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.4)";
document.body.appendChild(toggleBtn);

const sidebar = document.createElement("div");
sidebar.style.position = "fixed";
sidebar.style.top = "0";
sidebar.style.right = "-520px";
sidebar.style.width = "500px";
sidebar.style.height = "100%";
sidebar.style.background = "#161616";
sidebar.style.color = "white";
sidebar.style.zIndex = "9998";
sidebar.style.padding = "20px";
sidebar.style.overflowY = "auto";
sidebar.style.transition = "0.3s";
sidebar.style.boxShadow = "-2px 0 10px rgba(0,0,0,0.5)";
document.body.appendChild(sidebar);

// side bas styling

sidebar.innerHTML = `
    <div class="lc-container">
        <div class="lc-header">
            <div class="lc-title-group">

            <h2 class="lc-title">Your AI Mentor</h2>
        </div>
        <button id="closeBtn" class="lc-close-btn">✕</button>
    </div>

      <div id="status" class="lc-status-chip">
        <span class="pulse-dot"></span>
        Hint 1 available
      </div>

      <div id="timerBox" style="display:none;" class="lc-timer-card">
        <div class="lc-time-wrapper">
          <span id="timerDisplay">60</span><span class="lc-unit">s</span>
        </div>
      </div>

      <div class="lc-button-stack">
        <button id="hint1" class="lc-btn lc-btn-primary">Hint 1</button>
        <button id="hint2" class="lc-btn lc-btn-secondary" disabled>Hint 2</button>
        <button id="hint3" class="lc-btn lc-btn-secondary" disabled>Hint 3</button>
        <button id="answer" class="lc-btn lc-btn-success" disabled>Reveal Answer</button>
      </div>

      <div id="output"></div>
    </div>

    <style>
      :host {
        --bg-main: #242424;
        --bg-card: #2a2a2a;
        --border-subtle: #3e3e3e;
        --text-main: #eff1f6;
        --text-muted: #9ca3af;
        --lc-orange: #ffa116;
        --lc-green: #2cbb5d;
      }

      .lc-container {
        background: var(--bg-main);
        color: var(--text-main);
        font-family: 'Inter', -apple-system, system-ui, sans-serif;
        padding: 18px;
        height: 100vh;
        box-sizing: border-box;
      }

      /* Header Styling */
      .lc-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .lc-title-group {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .lc-title {
        font-size: 15px;
        font-weight: 600;
        margin: 0;
        letter-spacing: 0.3px;
      }

      .lc-close-btn {
        background: rgba(255, 161, 22, 0.1);
        border: 1px solid rgba(255, 161, 22, 0.4);
        color: var(--lc-orange);
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        transition: all 0.2s ease;
      }

      .lc-close-btn:hover {
        background: var(--lc-orange);
        color: black;
      }

      /* Status Chip */
      .lc-status-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #2c2c2c;
        border: 1px solid var(--border-subtle);
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        color: var(--lc-orange);
        margin-bottom: 16px;
      }

      .pulse-dot {
        width: 6px;
        height: 6px;
        background: var(--lc-orange);
        border-radius: 50%;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 161, 22, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(255, 161, 22, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 161, 22, 0); }
      }

      /* Timer Card */
      .lc-timer-card {
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        padding: 12px;
        text-align: center;
        margin-bottom: 16px;
      }

      .lc-label {
        font-size: 10px;
        font-weight: 700;
        color: var(--text-muted);
        letter-spacing: 1px;
      }

      .lc-time-wrapper {
        font-size: 28px;
        font-weight: 700;
        color: var(--text-main);
      }

      .lc-unit {
        font-size: 14px;
        color: var(--text-muted);
        margin-left: 2px;
      }

      /* Buttons */
      .lc-button-stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .lc-btn {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid transparent;
      }

      .lc-btn-primary {
        background: #3e3e3e;
        color: var(--text-main);
        border-color: #505050;
      }

      .lc-btn-primary:hover {
        background: #4a4a4a;
      }

      .lc-btn-secondary {
        background: transparent;
        border: 1px solid var(--border-subtle);
        color: var(--text-muted);
      }

      .lc-btn-success {
        background: rgba(44, 187, 93, 0.1);
        border-color: rgba(44, 187, 93, 0.4);
        color: var(--lc-green);
        margin-top: 4px;
      }

      .lc-btn-success:hover:not(:disabled) {
        background: var(--lc-green);
        color: white;
      }

      .lc-btn:disabled {
        opacity: 0.2;
        cursor: not-allowed;
        filter: grayscale(1);
      }

      /* Output Cards */
      .card {
        background: var(--bg-card);
        border-left: 3px solid var(--lc-orange);
        padding: 14px;
        margin-top: 15px;
        border-radius: 4px 8px 8px 4px;
        font-size: 13.5px;
        line-height: 1.6;
        color: #d1d5db;
      }
      pre {
        background: #0d1117;
        padding: 12px;
        border-radius: 8px;
        overflow-x: auto;
        margin-top: 10px;
      }

      code {
        color: #e6edf3;
        font-family: 'Fira Code', monospace;
        font-size: 13px;
      }
    </style>`;


const output = sidebar.querySelector("#output");
const status = sidebar.querySelector("#status");
const timerBox = sidebar.querySelector("#timerBox");
const timerDisplay = sidebar.querySelector("#timerDisplay");

const hint1Btn = sidebar.querySelector("#hint1");
const hint2Btn = sidebar.querySelector("#hint2");
const hint3Btn = sidebar.querySelector("#hint3");
const answerBtn = sidebar.querySelector("#answer");
const closeBtn = sidebar.querySelector("#closeBtn");


toggleBtn.onclick = () => {
    sidebarVisible = !sidebarVisible;
    sidebar.style.right = sidebarVisible ? "0" : "-520px";
};


closeBtn.onclick = () => {
    sidebarVisible = false;
    sidebar.style.right = "-520px";
};


function getProblem() {
    return document.querySelector('[data-track-load="description_content"]')?.innerText;
}



function cleanText(text) {
    return text.replace(/[*#]/g, ""); 
}

// api
async function callAI(prompt) {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    return cleanText(data.text);
}

//tiemr
function delayUnlock(btn, label, seconds = 60) {
    let remaining = seconds;

    timerBox.style.display = "block";
    timerDisplay.innerText = remaining;
    status.innerText = `Unlocking ${label} in...`;

    const interval = setInterval(() => {
      remaining--;
      timerDisplay.innerText = remaining;

      if (remaining <= 0) {
        clearInterval(interval);

        // Hide timer, unlock button
        timerBox.style.display = "none";
        btn.disabled = false;
        btn.style.background = "#16a34a";
        status.innerText = `✅ ${label} unlocked!`;
      }
    }, 1000);
}
// formatting response..
function formatResponse(text) {
  return text
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre><code>${code}</code></pre>`;
    })
    .replace(/\n/g, "<br>");
}
//output block
function addOutput(title, text) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<b>${title}</b>\n\n${text}`;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}
function resetUI() {
    output.innerHTML = "";
    status.innerText = "Hint 1 available";

    hint1Btn.disabled = false;
    hint2Btn.disabled = true;
    hint3Btn.disabled = true;
    answerBtn.disabled = true;

    hint2Btn.style.background = "";
    hint3Btn.style.background = "";
    answerBtn.style.background = "";

    timerBox.style.display = "none";
}

// hint1
hint1Btn.onclick = async () => {
    hint1Btn.disabled = true;
    const desc = getProblem();
    addOutput("Generating Hint 1...", "");
    const res = await callAI(`Give beginner hint in 100 - 150 words.\n\n${desc}`);
    output.lastChild.innerHTML = `<b>💡 Hint 1</b>\n\n${res}`;
    delayUnlock(hint2Btn, "Hint 2");
};

// hint 2
hint2Btn.onclick = async () => {
    hint2Btn.disabled = true;
    const desc = getProblem();
    addOutput("Generating Hint 2...", "");
    const res = await callAI(`Give stronger hint.\n\n${desc}`);
    output.lastChild.innerHTML = `<b>💡 Hint 2</b>\n\n${res}`;
    delayUnlock(hint3Btn, "Hint 3");
};

// hint 3
hint3Btn.onclick = async () => {
    hint3Btn.disabled = true;
    const desc = getProblem();
    addOutput("Generating Hint 3...", "");
    const res = await callAI(`Final hint before solution.\n\n${desc}`);
    output.lastChild.innerHTML = `<b>💡 Hint 3</b>\n\n${res}`;
    delayUnlock(answerBtn, "Answer");
};

// answer
answerBtn.onclick = async () => {
    answerBtn.disabled = true;
    const desc = getProblem();

    addOutput("Generating Answer...", "");
    const res = await callAI(`
      You are a strict coding assistant.
      Give High quality code solution.
      STRICT RULES:
      - Follow LeetCode format exactly
      - Only write code inside class Solution
      - Do NOT add main method
      - Do NOT throw exceptions
      - Do NOT add unnecessary comments
      - Keep code clean and minimal
      - Assume input is always valid (as per LeetCode)

      OUTPUT FORMAT:

      Explanation:
      - Max 2 lines

      Java:
      \`\`\`java
      <code>
      \`\`\`

      C++:
      \`\`\`cpp
      <code>
      \`\`\`

      Python:
      \`\`\`python
      <code>
      \`\`\`

      ONLY return in this format.
      Problem:
      ${desc}
      `);

          output.lastChild.innerHTML = `<b>✅Answer</b>${formatResponse(res)}`;
      };

setInterval(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      resetUI();
    }
}, 1000);
