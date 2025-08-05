# Assistente de IA Web

Este projeto é um assistente de IA web interativo e completo, desenvolvido com HTML, CSS e JavaScript puro, sem a necessidade de frameworks. A aplicação permite que os usuários façam perguntas a uma inteligência artificial (OpenAI ou Google Gemini) e recebam as respostas diretamente na interface.

# Funcionalidades

**Estrutura HTML**: Cabeçalho, campo para chave de API, área para pergunta e seção para resposta.

**Interface de Entrada**: Campo de texto para a pergunta, botão de envio e campo para a chave de API (tipo `password`).

**Exibição da Resposta**: Uma área dedicada e formatada para a resposta da IA, que permanece oculta até que uma resposta seja gerada.

**Integração com API**: Uso do `fetch()` com `async/await` para fazer requisições POST, enviando a pergunta e a chave de API para o endpoint da IA e processando o retorno.

## Funcionalidades Extras (Opcionais)

**Validação e Estados**:

- Estados de carregamento (`loading`) durante a espera pela resposta.

- Validação de campos para evitar o envio de pergunta ou chave de API em branco.

- Exibição de mensagens de erro amigáveis em caso de falha na conexão.

**Interação e Interface**:

- Botão para limpar a resposta da tela.

- Funcionalidade para copiar a resposta para a área de transferência.

- Salvamento da chave de API no `localStorage` do navegador.

- Atalho: `Ctrl+Enter` para enviar a pergunta.

- Exibição da pergunta original junto com a resposta.

- Ícones, animações e scroll automático para uma melhor usabilidade.

- Dropdown para selecionar diferentes modelos de IA.

## Configurações Avançadas:

- Histórico de conversas.

- Alternância entre tema claro e escuro (`dark/light mode`).

# Tecnologias Utilizadas

<img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/> <img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>

**API**:

- Google Gemini API

# Conclusão

Ao final deste projeto, você terá uma aplicação web funcional e com uma interface profissional, demonstrando a integração com APIs de IA e aplicando conceitos fundamentais do desenvolvimento web moderno.
