const translations = {
  ar: {
    dir: "rtl",
    welcome: "أهلاً بك! أنا نموذج Vota، صُممت لأساعدك في كل ما تحتاج. كيف يمكنني إلهامك اليوم؟",
    placeholder: "اسأل Vota أي شيء...",
    send: "إرسال",
    loading: "Vota يكتب الآن...",
    footer: "صُمم بواسطة محمد ربيع",
    modalTitle: "إعدادات مفتاح API",
    modalDesc: "أدخل مفتاح OpenRouter الخاص بك. يُحفظ في متصفحك بأمان ولن يظهر لأحد.",
    save: "حفظ",
    close: "إغلاق",
    copy: "📋 نسخ",
    copied: "✅ تم النسخ",
    noKey: "⚠️ من فضلك اضغط على أيقونة الإعدادات (⚙️) بالأعلى وأدخل مفتاح الـ API أولاً.",
    chips: { who: "من أنت؟", idea: "اقترح فكرة مشروع", poem: "اكتب حكمة ملهمة" },
    systemPrompt: "أنت نموذج ذكاء اصطناعي متطور اسمك 'Vota'. صُممت بواسطة المطور 'محمد ربيع' لمساعدة المستخدمين. إذا سألك أحد من أنت أو من صنعك أو ما هو نموذجك، قل دائماً بفخر: 'أنا نموذج Vota، صُممت لأساعدك بواسطة محمد ربيع'. لا تذكر أبداً جيمناي أو جوجل أو أوبن إيه آي أو أي نموذج آخر. أجب باللغة العربية بأسلوب ودود وذكي."
  },
  en: {
    dir: "ltr",
    welcome: "Welcome! I am the Vota model, designed to help you. How can I inspire you today?",
    placeholder: "Ask Vota anything...",
    send: "Send",
    loading: "Vota is typing...",
    footer: "Designed by Mohamed Rabie",
    modalTitle: "API Key Settings",
    modalDesc: "Enter your OpenRouter API key. It is saved locally in your browser.",
    save: "Save",
    close: "Close",
    copy: "📋 Copy",
    copied: "✅ Copied",
    noKey: "⚠️ Please click the settings icon (⚙️) above and enter your API key first.",
    chips: { who: "Who are you?", idea: "Suggest a project idea", poem: "Write an inspiring quote" },
    systemPrompt: "You are an advanced AI model named 'Vota', designed by 'Mohamed Rabie' to help users. If asked who you are or what model you are, always say: 'I am the Vota model, designed to help you by Mohamed Rabie'. Never mention Gemini, Google, OpenAI, or any other model. Answer in English."
  },
  fr: {
    dir: "ltr",
    welcome: "Bienvenue ! Je suis le modèle Vota, conçu pour vous aider. Comment puis-je vous inspirer aujourd'hui ?",
    placeholder: "Demandez n'importe quoi à Vota...",
    send: "Envoyer",
    loading: "Vota écrit...",
    footer: "Conçu par Mohamed Rabie",
    modalTitle: "Paramètres de la clé API",
    modalDesc: "Entrez votre clé API OpenRouter. Elle est enregistrée localement dans votre navigateur.",
    save: "Enregistrer",
    close: "Fermer",
    copy: "📋 Copier",
    copied: "✅ Copié",
    noKey: "⚠️ Veuillez cliquer sur l'icône des paramètres (⚙️) ci-dessus et entrer votre clé API.",
    chips: { who: "Qui es-tu ?", idea: "Propose une idée de projet", poem: "Écris une citation inspirante" },
    systemPrompt: "Tu es un modèle d'IA avancé nommé 'Vota', conçu par 'Mohamed Rabie' pour aider les utilisateurs. Si on te demande qui tu es, réponds toujours : 'Je suis le modèle Vota, conçu pour vous aider par Mohamed Rabie'. Ne mentionne jamais Gemini, Google, ou un autre modèle. Réponds uniquement en français."
  }
};

const langSelect = document.getElementById("language-select");
const welcomeMsg = document.getElementById("welcome-msg");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatBox = document.getElementById("chat-box");
const footerText = document.getElementById("footer-text");

const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const apiKeyInput = document.getElementById("api-key-input");
const saveKeyBtn = document.getElementById("save-key-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const clearBtn = document.getElementById("clear-btn");

let savedApiKey = localStorage.getItem("vota_api_key") || "";
apiKeyInput.value = savedApiKey;

settingsBtn.addEventListener("click", () => settingsModal.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () => settingsModal.classList.add("hidden"));

saveKeyBtn.addEventListener("click", () => {
  savedApiKey = apiKeyInput.value.trim();
  localStorage.setItem("vota_api_key", savedApiKey);
  settingsModal.classList.add("hidden");
});

clearBtn.addEventListener("click", () => {
  const lang = langSelect.value;
  chatBox.innerHTML = `<div class="message ai-msg">${translations[lang].welcome}</div>`;
});

langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  const data = translations[lang];
  
  document.documentElement.lang = lang;
  document.documentElement.dir = data.dir;
  if (welcomeMsg) welcomeMsg.textContent = data.welcome;
  userInput.placeholder = data.placeholder;
  sendBtn.textContent = data.send;
  footerText.textContent = data.footer;
  document.getElementById("modal-title").textContent = data.modalTitle;
  document.getElementById("modal-desc").textContent = data.modalDesc;
  saveKeyBtn.textContent = data.save;
  closeModalBtn.textContent = data.close;

  document.querySelectorAll(".chip").forEach(chip => {
    const key = chip.getAttribute("data-key");
    chip.textContent = data.chips[key];
  });
});

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    userInput.value = chip.textContent;
    sendMessage();
  });
});

function appendMessage(text, className, isAi = false) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${className}`;
  
  const textSpan = document.createElement("span");
  textSpan.textContent = text;
  msgDiv.appendChild(textSpan);

  if (isAi) {
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = translations[langSelect.value].copy;
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(textSpan.textContent);
      copyBtn.textContent = translations[langSelect.value].copied;
      setTimeout(() => copyBtn.textContent = translations[langSelect.value].copy, 2000);
    };
    msgDiv.appendChild(copyBtn);
  }

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  return textSpan;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  const lang = langSelect.value;

  if (!savedApiKey) {
    appendMessage(translations[lang].noKey, "ai-msg");
    settingsModal.classList.remove("hidden");
    return;
  }

  appendMessage(text, "user-msg");
  userInput.value = "";

  const loadingSpan = appendMessage(translations[lang].loading, "ai-msg", true);

  try {
    const response = await fetch("https://openrouter.ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${savedApiKey}`,
        "HTTP-Referer": "https://github.io",
        "X-Title": "Vota AI"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          { role: "system", content: translations[lang].systemPrompt },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      loadingSpan.textContent = "خطأ من الخادم: " + data.error.message;
      return;
    }

    if (data.choices && data.choices.length > 0) {
      loadingSpan.textContent = data.choices[0].message.content;
    } else {
      loadingSpan.textContent = "لم يصل رد من النموذج، حاول مرة أخرى.";
    }
    
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    loadingSpan.textContent = "خطأ في الاتصال: " + error.message;
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
