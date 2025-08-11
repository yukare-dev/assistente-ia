const form = document.getElementById("formPergunta");
const inputApiKey = document.getElementById("apiKey");
const textareaPergunta = document.getElementById("pergunta");
const secaoResposta = document.querySelector(".secao-resposta");
const pResposta = document.getElementById("resposta");

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

  pResposta.textContent = "Carregando...";
  secaoResposta.hidden = false;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/chat-bison-001:generateMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: {
            messages: [{ author: "user", content: pergunta }],
          },
          temperature: 0.7,
          candidateCount: 1,
          maxOutputTokens: 1024,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // O texto gerado normalmente está em data.candidates[0].message.content
    const respostaIA = data.candidates?.[0]?.message?.content || "Resposta não encontrada.";

    pResposta.textContent = respostaIA;
  } catch (error) {
    pResposta.textContent = `Erro: ${error.message}`;
  }
});
