const form = document.getElementById("formPergunta");
const inputApiKey = document.getElementById("apiKey");
const textareaPergunta = document.getElementById("pergunta");
const secaoResposta = document.querySelector(".secao-resposta");
const pResposta = document.getElementById("resposta");
const btnCopiar = document.getElementById("copiarResposta");
const btnLimpar = document.getElementById("limparResposta");

// Evento de envio do formulário
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const apiKey = inputApiKey.value.trim();
  const pergunta = textareaPergunta.value.trim();

  if (!apiKey) {
    alert("Por favor, insira sua API Key.");
    return;
  }
  if (!pergunta) {
    alert("Por favor, digite sua pergunta.");
    return;
  }

  // Mostra a seção de resposta
  secaoResposta.classList.remove("hidden");
  pResposta.textContent = "Carregando...";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: pergunta }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    const respostaIA =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Resposta não encontrada.";

    pResposta.textContent = respostaIA;
  } catch (error) {
    pResposta.textContent = `Erro: ${error.message}`;
  }
});

// Botão "Copiar Resposta"
btnCopiar.addEventListener("click", async () => {
  const texto = pResposta.textContent.trim();
  if (!texto || texto === "Carregando...") {
    alert("Não há resposta para copiar!");
    return;
  }

  try {
    await navigator.clipboard.writeText(texto);
    btnCopiar.textContent = "✅ Copiado!";
    btnCopiar.classList.add("copiado");

    setTimeout(() => {
      btnCopiar.textContent = "📋 Copiar";
      btnCopiar.classList.remove("copiado");
    }, 2000);
  } catch (err) {
    alert("Erro ao copiar a resposta.");
    console.error(err);
  }
});

// Botão "Limpar Resposta"
btnLimpar.addEventListener("click", () => {
  pResposta.textContent = "";
  secaoResposta.classList.add("hidden");
  textareaPergunta.value = "";
});

// Salvar ApiKey no localStorage

const storageApiKey = "apiKeyValue";

inputApiKey.addEventListener("input", () => {
  localStorage.setItem(storageApiKey, inputApiKey.value);
});

function loadApiKeyFromStorage() {
  const savedApiKey = localStorage.getItem(storageApiKey);

  if (savedApiKey) {
    inputApiKey.value = savedApiKey;
  }
}

loadApiKeyFromStorage();
