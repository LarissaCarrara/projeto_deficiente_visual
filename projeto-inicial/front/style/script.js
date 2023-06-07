   // selecione os elementos HTML
const video = document.querySelector("#video-preview");
const canvas = document.querySelector("#canvas-preview");
const captureBtn = document.querySelector("#capture-btn");
const table = document.querySelector("table");
const produto = document.querySelector("#produto");

// const tab_produto = document.querySelector('#trproduto');
// const tab_sabor = document.querySelector('#sabor');
// const tab_preco = document.querySelector('#preco');
// const tab_descricao = document.querySelector('#descricao');
// const tab_marca = document.querySelector('#marca');
const tbody = document.querySelector("tbody");
const downloadLink = document.querySelector("#download-link");

const tbodyClone = tbody.cloneNode(true);
const dados = {
  produto: "",
  marca: "",
  sabor: "",
};

// defina a largura e a altura do vídeo
const videoWidth = 200;
const videoHeight = 150;

// defina as opções da câmera
const constraints = {
  video: {
    width: videoWidth,
    height: videoHeight,
  },
};

// solicite permissão para acessar a câmera
navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    // exiba o fluxo de vídeo no elemento de vídeo
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error(err);
  });
let imcSrc = "";
// adicione um evento de clique ao botão de captura
let blobTeste = "";
const img = document.createElement("img");
captureBtn.addEventListener("click", () => {
  // desenhe o quadro atual do vídeo no elemento de canvas
  canvas.getContext("2d").drawImage(video, 0, 0, 300, videoHeight);
  canvas.toBlob(function (blob) {
    // Crie um URL temporário para o Blob
    blobTeste = blob;
    imcSrc = URL.createObjectURL(blob);
    console.log(imcSrc);
    downloadLink.href = imcSrc;
    downloadLink.click();
  }, "image/png");
  // exiba a imagem capturada em uma div
  img.src = canvas.toDataURL("image/png");
  img.classList = "img";
  document.querySelector(".div_img").appendChild(img);
});

fetch("C:/Users/Aluno/Downloads/teste.png").then((res) => console.log(res));

function buscar() {
  const arq = document.querySelector("#file");
  const data = new FormData();
  data.append("img", arq.files[0], arq.files[0].name);

//   if (!blobTeste) {
//     console.log("Nenhuma imagem capturada.");
//     return;
//   }

  const file = new File([blobTeste], "captured_image.png");

  const formData = new FormData();
  formData.append("imagem", file);

  const options = {
    headers: {
      "Prediction-Key": "881942d274284a68ad90411cf81665c8",
    },
    method: "POST",
    body: data,
  };
  fetch(
    "https://inteligenciaartificialunisal-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/683de454-c974-4889-bd6a-9aede14acba2/detect/iterations/Iteration1/image",
    options
  )
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Erro na solicitação");
      }
    })
    .then((resp) => {
      // Classifica as previsões em ordem decrescente de probabilidade
      resp.predictions.sort((a, b) => b.probability - a.probability);
      tbody.innerHTML = tbodyClone.innerHTML;
      const tab_produto = document.querySelector("#trproduto");
      const tab_sabor = document.querySelector("#sabor");
      const tab_preco = document.querySelector("#preco");
      const tab_descricao = document.querySelector("#descricao");
      const tab_marca = document.querySelector("#marca");
      if (resp != undefined) {
        // tbody.innerHTML = tbodyClone.innerHTML
        table.style.display = "block";

        let x = 0;
        let y = 0;
        let z = 0;
        let sabor = false;
        let marca = false;
        let produto = false;

        resp.predictions.forEach((element, index) => {
          if (sabor && marca && produto) return;
          if (x == 0) {
            if (element.tagName.includes("Produto")) {
              const tdproduto = document.createElement("td");
              let frase = []
              frase = element.tagName.split(' ');
              frase.slice(0, 1)
              
              tdproduto.innerHTML = frase.join(' ');;
              tdproduto.className = "t";

              const tdprob1 = document.createElement("td");
              tdprob1.innerHTML = (element.probability * 100).toFixed(3) + "%";

              tdprob1.classList = "t";

              dados.produto = tdproduto.innerHTML;

              tab_produto.appendChild(tdproduto);
              tab_produto.appendChild(tdprob1);
              x = 1;
              return;
            }
          }
          if (y == 0) {
            if (element.tagName.includes("Marca")) {
              const tdmarca = document.createElement("td");
              let frase = []
              frase = element.tagName.split(' ');
              frase.slice(0, 1)

              tdmarca.innerHTML = frase.join(' ');
              tdmarca.classList = "t";
              const tdprob3 = document.createElement("td");
              tdprob3.innerHTML = (element.probability * 100).toFixed(3) + "%";
              tdprob3.classList = "t";


              tab_marca.appendChild(tdmarca);
              tab_marca.appendChild(tdprob3);

              dados.marca = tdmarca.innerHTML;
              marca = true;
              y = 1;
              return;
            }
          }
          if (z == 0) {
            if (element.tagName.includes("Sabor")) {
              const tdsabor = document.createElement("td");
              const tdprob2 = document.createElement("td");
              let frase = []
              frase = element.tagName.split(' ');
              frase.slice(0, 1)
              tdsabor.innerHTML = frase.join(' ');
              tdsabor.className = "t";
              tdprob2.innerHTML = (element.probability * 100).toFixed(3) + "%";
              tdprob2.classList = "t";

              tab_sabor.appendChild(tdsabor);
              tab_sabor.appendChild(tdprob2);

              dados.sabor = tdsabor.innerHTML;
              sabor = true;
              z = 1;
              return;
            }
          }
        });
        fetch("https://ia-k7lc.onrender.com/listar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            data.forEach((element) => {
              const tdpreco = document.createElement("td");
              tdpreco.innerHTML = "R$ " + element.preco.toFixed(2);
              tdpreco.className = "t";

              const tdvazio = document.createElement("td");
              tdvazio.innerHTML = "&nbsp;";

              const tddescricao = document.createElement("td");
              tddescricao.innerHTML = element.descricao;
              tddescricao.classList = "t";
            
              if ('speechSynthesis' in window) {
                // Cria um novo objeto SpeechSynthesisUtterance
                var mensagem = new SpeechSynthesisUtterance();
              
                // Define o texto a ser lido em voz alta
                mensagem.text = element.descricao;
              
                // Fala a mensagem
                speechSynthesis.speak(mensagem);
              } else {
                console.log('A API de síntese de fala não é suportada neste navegador.');
              }

              const tdvazio2 = document.createElement("td");
              tdvazio2.innerHTML = "&nbsp;";

              tab_preco.appendChild(tdpreco);
              tab_preco.appendChild(tdvazio);
              tab_descricao.appendChild(tddescricao);
              tab_descricao.appendChild(tdvazio2);
            });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}

function mostrar() {
  const img = document.querySelector("#produto");
  const arq = document.querySelector("#file");
  if (arq.files) {
    produto.style.display = "block";
    const file = arq.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert("INSIRA UMA IMAGEM!");
  }
}

// function apareceImagem(){
//     produto.style.display = "block";

// }