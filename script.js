const form = document.getElementById("formPergunta");
const inputApiKey = document.getElementById("apiKey");
const textareaPergunta = document.getElementById("pergunta");
const secaoResposta = document.querySelector(".secao-resposta");
const pResposta = document.getElementById("resposta");
const btnCopiar = document.getElementById("copiarResposta");

// Evento de envio do formulário
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const apiKey = inputApiKey.value.trim();
  const pergunta = textareaPergunta.value.trim();

  // Validação básica
  if (!apiKey) {
    alert("Por favor, insira sua API Key.");
    return;
  }
  if (!pergunta) {
    alert("Por favor, digite sua pergunta.");
    return;
  }

  // Exibe a seção de resposta e coloca loading
  pResposta.textContent = "Carregando...";
  secaoResposta.hidden = false;

  try {
    // Faz a requisição para a API Gemini (compatível com OpenAI)
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "models/chat-bison-001", // modelo do Gemini
          messages: [
            {
              role: "user",
              content: pergunta,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    // A resposta do Gemini vem em data.choices[0].message.content
    const respostaIA =
      data.choices?.[0]?.message?.content || "Resposta não encontrada.";

    pResposta.textContent = respostaIA;
  } catch (error) {
    pResposta.textContent = `Erro: ${error.message}`;
  }
});

// Evento do botão "Copiar Resposta"
btnCopiar.addEventListener("click", async () => {
  const texto = pResposta.textContent.trim();

  if (!texto || texto === "Carregando...") {
    alert("Não há resposta para copiar!");
    return;
  }

  try {
    await navigator.clipboard.writeText(texto);

    // Feedback visual no botão
    btnCopiar.textContent = "✅ Copiado!";
    btnCopiar.classList.add("copiado");

    // Volta ao normal depois de 2s
    setTimeout(() => {
      btnCopiar.textContent = "📋 Copiar";
      btnCopiar.classList.remove("copiado");
    }, 2000);
  } catch (err) {
    alert("Erro ao copiar a resposta. Tente manualmente.");
    console.error("Erro ao copiar:", err);
  }
});
