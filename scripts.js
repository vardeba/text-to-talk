// Seleção de elementos
const selecaoVoz = document.querySelector("#selecao-voz");
const entradaTexto = document.querySelector("#entrada-de-texto");
const botaoOuvir = document.querySelector("#ouvir-btn");
const botoaBaixarTexto = document.querySelector("#baixar-texto-btn");
const uplaodArquivo = document.querySelector("#upload-arquivo");

// Iniciar a API de vozes
const fala = new SpeechSynthesisUtterance();

let vozesDisponiveis = [];

// preencher o select
const atualizarValores = () => {
    vozesDisponiveis = window.speechSynthesis.getVoices();

    fala.voice = vozesDisponiveis[0];

    console.log(vozesDisponiveis);

    vozesDisponiveis.forEach((voz, index) => {
        const opcao = document.createElement("option");
        opcao.value = index;
        opcao.textContent = voz.name;
        selecaoVoz.appendChild(opcao);
    });
};

window.speechSynthesis.onvoiceschanged = atualizarValores;

// Executar o texto como voz
selecaoVoz.addEventListener("change", () => {
    fala.voice = vozesDisponiveis[selecaoVoz.value];
});

botaoOuvir.addEventListener("click", () => {
    fala.text = entradaTexto.value;

    window.speechSynthesis.speak(fala);
});

// baixar texto em arquivo
botoaBaixarTexto.addEventListener("click", () => {
    const texto = entradaTexto.value;

    const blob = new Blob([texto], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "texto.txt";

    a.click();

    URL.revokeObjectURL(url);
});

// Enviando o arquivo para ser lido
uplaodArquivo.addEventListener("change", (event) => {
    const arquivo = event.target.files[0];

    if (arquivo) {
        const leitor = new FileReader();

        leitor.onload = (e) => {
            entradaTexto.value = e.target.result;
        };

        leitor.readAsText(arquivo);
    }
});
