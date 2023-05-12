// selecione os elementos HTML
const video = document.querySelector('#video-preview');
const canvas = document.querySelector('#canvas-preview');
const captureBtn = document.querySelector('#capture-btn');
const table = document.querySelector('table');
const tab_produto = document.querySelector('#trproduto');
const tab_sabor = document.querySelector('#sabor');
const tab_preco = document.querySelector('#preco');
const tab_descricao = document.querySelector('#descricao');
const tab_marca = document.querySelector('#marca');
const tbody = document.querySelector('tbody')

const dados = {
    "produto": "",
    "marca":"",
    "sabor": ""
}

// // defina a largura e a altura do vídeo
// const videoWidth = 320;
// const videoHeight = 240;

// // defina as opções da câmera
// const constraints = {
//   video: {
//     width: videoWidth,
//     height: videoHeight,
//     facingMode: 'environment' // usa a câmera traseira do dispositivo móvel
//   }
// };

// // solicite permissão para acessar a câmera
// navigator.mediaDevices.getUserMedia(constraints)
//   .then(stream => {
//     // exiba o fluxo de vídeo no elemento de vídeo
//     video.srcObject = stream;
//     video.play();
//   })
//   .catch(err => {
//     console.error(err);
//   });

// // adicione um evento de clique ao botão de captura
// captureBtn.addEventListener('click', () => {
//   // desenhe o quadro atual do vídeo no elemento de canvas
//   canvas.getContext('2d').drawImage(video, 0, 0, videoWidth, videoHeight);

//   // exiba a imagem capturada em uma div
//   const img = document.createElement('img');
//   img.src = canvas.toDataURL('image/png');
//   document.querySelector('div').appendChild(img);
// });

function buscar() {
   // Seleciona o elemento tbody da tabela
   const tbody = document.querySelector('table tbody');

   // Limpa o conteúdo da tabela
   tbody.innerHTML = '';


    const arq = document.querySelector("#file");
    const data = new FormData();
    data.append("img", arq.files[0], arq.files[0].name);
    const options = {
        headers: {
            'Prediction-Key': '881942d274284a68ad90411cf81665c8',
        },
        method: 'POST',
        body: data,
    };
    fetch('https://inteligenciaartificialunisal-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/683de454-c974-4889-bd6a-9aede14acba2/detect/iterations/Iteration1/image', options)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error('Erro na solicitação');
            }
        })
        .then(resp => {
            // Classifica as previsões em ordem decrescente de probabilidade
            resp.predictions.sort((a, b) => b.probability - a.probability);
            console.log(resp.predictions);

            if (resp != undefined) {
                
                table.style.display = "block";
                let x = 0
                let y=0
                let z=0
                let sabor = false
                let marca = false
                let produto = false
                resp.predictions.forEach((element, index) => {
                    tbody.innerHTML = ""
                    if (sabor && marca && produto) return

                if(x==0){

                    if (element.tagName.includes("Salgadinho")) {
                        const tdproduto = document.createElement('td');
                        tdproduto.innerHTML = element.tagName;
                        tdproduto.className = "t";
                        
                        const tdprob1 = document.createElement("td");
                        tdprob1.innerHTML = (element.probability) * 100 + '%';
                        
                        tdprob1.classList = "t";

                        dados.produto = tdproduto.innerHTML;
                        
                        tab_produto.appendChild(tdproduto);
                        tab_produto.appendChild(tdprob1);
                        x=1;
                        return
                    }
                    
                }   
                    if(y==0){
                        if (element.tagName.includes("Lays")) {
                            const tdmarca = document.createElement('td')
                            tdmarca.innerHTML = element.tagName
                            tdmarca.classList = "t";
                            const tdprob3 = document.createElement('td');
                            tdprob3.innerHTML = (element.probability) * 100 + '%';
                            tdprob3.classList = "t";
                            
                            tab_marca.appendChild(tdmarca)
                            tab_marca.appendChild(tdprob3)
                            
                            dados.marca = tdmarca.innerHTML;
                            marca = true
                            y=1;
                            return
                        }
                    }

                    if(z==0){
                        if (element.tagName.includes("Sabor")) {
                            const tdsabor = document.createElement('td');
                            const tdprob2 = document.createElement("td");
                            tdsabor.innerHTML = element.tagName;
                            tdsabor.className = "t";
                            tdprob2.innerHTML = (element.probability) * 100 + '%';
                            tdprob2.classList = "t";
    
                            tab_sabor.appendChild(tdsabor);
                            tab_sabor.appendChild(tdprob2);
                            
                            dados.sabor = tdsabor.innerHTML;
                            sabor = true
                            z=1;
                            return
                        }
                    }
                    //se achar o sabor insere na coluna sabor 

                   
                })

                console.log(dados);
            
                fetch('http://localhost:3001/listar', 
                {
                   method: 'POST',
                   headers: {'Content-Type': 'application/json'},
                   body: JSON.stringify(dados)
                }) .then(resp => {
                        return resp.json();
                    })
                    .then(data => {
                        console.log(data);
                            data.forEach(element => {

                                const tdpreco = document.createElement('td');
                                const tddescricao = document.createElement("td");
                                tdpreco.innerHTML = "R$ "+(element.preco);
                                tdpreco.className = "t";
                                tddescricao.innerHTML = element.descricao;
                                tddescricao.classList = "t";
        
                                tab_preco.appendChild(tdpreco);
                                tab_descricao.appendChild(tddescricao);
                            })
                        
                    }) .catch(err => console.log(err));

            }
        })
        .catch(err => console.log(err));
}

function mostar() {
    const img = document.querySelector("#produto")
    const arq = document.querySelector("#file")
    console.log(arq.files[0].name)
    const file = arq.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}