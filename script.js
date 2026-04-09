// =========================================
// CALCULADORA DE IMC
// =========================================

/**
 * Classifica o IMC de acordo com as faixas da OMS
 * @param {number} imc - Valor do IMC calculado
 * @returns {Object} - Objeto com texto de classificação, classe CSS e posição na barra
 */
function classificarIMC(imc) {
  if (imc < 18.5) {
    return {
      texto: "Abaixo do peso",
      classe: "abaixo",
      cor: "#60a5fa",
      posicao: (imc / 18.5) * 18  // mapeia para 0-18% da barra
    };
  } else if (imc < 25) {
    return {
      texto: "Peso normal",
      classe: "normal",
      cor: "#4ade80",
      posicao: 18 + ((imc - 18.5) / 6.5) * 24  // mapeia para 18-42%
    };
  } else if (imc < 30) {
    return {
      texto: "Sobrepeso",
      classe: "sobrepeso",
      cor: "#facc15",
      posicao: 42 + ((imc - 25) / 5) * 16  // mapeia para 42-58%
    };
  } else if (imc < 35) {
    return {
      texto: "Obesidade Grau I",
      classe: "obesidade1",
      cor: "#fb923c",
      posicao: 58 + ((imc - 30) / 5) * 14  // mapeia para 58-72%
    };
  } else if (imc < 40) {
    return {
      texto: "Obesidade Grau II",
      classe: "obesidade2",
      cor: "#f87171",
      posicao: 72 + ((imc - 35) / 5) * 14  // mapeia para 72-86%
    };
  } else {
    return {
      texto: "Obesidade Grau III",
      classe: "obesidade3",
      cor: "#c084fc",
      posicao: Math.min(86 + ((imc - 40) / 10) * 12, 97)  // mapeia para 86-98%
    };
  }
}

/**
 * Função principal chamada ao clicar no botão
 */
function calcularIMC() {
  // 1. Captura os valores dos inputs
  var inputPeso   = document.getElementById("peso");
  var inputAltura = document.getElementById("altura");

  var peso   = parseFloat(inputPeso.value);
  var altura = parseFloat(inputAltura.value);

  // 2. Validação dos campos
  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    destacarErro(inputPeso, isNaN(peso) || peso <= 0);
    destacarErro(inputAltura, isNaN(altura) || altura <= 0);
    return;
  }

  // Remove destaque de erro caso campos estejam válidos
  destacarErro(inputPeso, false);
  destacarErro(inputAltura, false);

  // 3. Calcula o IMC: IMC = peso / (altura × altura)
  var imc = peso / (altura * altura);

  // 4. Classifica o IMC
  var classificacao = classificarIMC(imc);

  // 5. Exibe os resultados na tela
  exibirResultado(imc, classificacao);
}

/**
 * Atualiza a interface com o resultado calculado
 */
function exibirResultado(imc, classificacao) {
  // Elementos da página
  var elementoValor         = document.getElementById("valor-imc");
  var elementoClassificacao = document.getElementById("classificacao");
  var elementoResultado     = document.getElementById("resultado");
  var barraFill             = document.getElementById("barra-fill");
  var barraMarker           = document.getElementById("barra-marker");

  // Remove classes de estado anteriores
  elementoResultado.className = "resultado";

  // Pequeno delay para a transição funcionar corretamente
  setTimeout(function() {
    // Atualiza o valor do IMC com 2 casas decimais
    elementoValor.textContent = imc.toFixed(2);
    elementoValor.style.color = classificacao.cor;

    // Atualiza a tag de classificação
    elementoClassificacao.textContent = classificacao.texto;
    elementoClassificacao.style.background = classificacao.cor + "22";
    elementoClassificacao.style.color      = classificacao.cor;
    elementoClassificacao.style.borderColor = classificacao.cor + "44";

    // Adiciona a classe de estado correspondente
    elementoResultado.classList.add(classificacao.classe);

    // Atualiza a barra indicadora
    barraFill.style.width   = classificacao.posicao + "%";
    barraMarker.style.left  = classificacao.posicao + "%";
    barraMarker.style.opacity = "1";
  }, 50);
}

/**
 * Destaca ou remove destaque de erro em um input
 */
function destacarErro(inputElement, temErro) {
  if (temErro) {
    inputElement.style.borderColor  = "#f87171";
    inputElement.style.boxShadow    = "0 0 0 3px rgba(248, 113, 113, 0.15)";
  } else {
    inputElement.style.borderColor  = "";
    inputElement.style.boxShadow    = "";
  }
}

// =========================================
// EVENTO: Permite calcular ao pressionar Enter
// =========================================
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    calcularIMC();
  }
});

// =========================================
// LIMPA erro quando o usuário começa a digitar
// =========================================
document.getElementById("peso").addEventListener("input", function() {
  destacarErro(this, false);
});

document.getElementById("altura").addEventListener("input", function() {
  destacarErro(this, false);
});
