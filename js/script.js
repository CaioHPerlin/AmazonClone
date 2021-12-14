//Carrega um arquivo JSON
//filePath é o parâmetro que você deve usar para informar o nome do arquivo. Ex: 'filmes.json'
var loadFile = function (filePath, done) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () { return done(this.responseText) }
  xhr.open("GET", filePath, true);
  xhr.send();
}

let dadosUsuario = {}
let dadosProdutos = {}

let carrinho = []

const carregaDados = function(func){
  console.log("Carregando dados dos produtos ...");  
  loadFile('/data/data.json', function (responseText) {
    dadosProdutos = JSON.parse(responseText)
    console.log("OK dados produtos");
    console.log("Carregando dados do usuário ...");  
    loadFile('/data/usuario.json', function (responseText) {
      dadosUsuario = JSON.parse(responseText)    
      console.log("OK dados usuario");
      func();
      return 1;
    })
  })
}

const carregaUsuario = function(){
  let userNameElement = document.getElementById("username");
  let userLocationElement = document.getElementById("userlocation");

  userNameElement.innerHTML = dadosUsuario.usuario.nome;
  userLocationElement.innerHTML = dadosUsuario.usuario.local;
}

const carregaPref = function(){
  let categoriasPref = dadosUsuario.usuario.categoriasPref;

  apenasPref = dadosProdutos.produtos.filter((produto => categoriasPref.indexOf(produto.categoria) != -1));
  
  carregaProdutos(apenasPref, "");
}

const setup = function(){
  carregaUsuario();
  carregaPref();

  console.log("Setup concluído")
}

function init() {
  carregaDados(setup);

}

function carregaCarrinho(produtosCarrinho) {

  let containerCarrinho = document.getElementById("containerCarrinho")
  let child = containerCarrinho.lastElementChild
  while (child){
    containerCarrinho.removeChild(child)
    child = containerCarrinho.lastElementChild
  }

  for (let produto of produtosCarrinho) {
    //Cria a div card para o produto
    let novaDiv = document.createElement('div')
    novaDiv['className'] = "card"
    containerCarrinho.appendChild(novaDiv);

    //cria a imagem dentro da div do card
    let img = document.createElement('img')
    img['src'] = produto.img    
    novaDiv.appendChild(img)

    //Cria o titulo do produto na div
    //<h1 class="nome">Leave in Urban men</h1>
    let nH1 = document.createElement('h1');
    nH1['className'] = "nome"
    nH1.textContent = produto.titulo
    novaDiv.appendChild(nH1)

    //Cria o preco
    //<p class="preco">R$ 19.99</p>
    let pPreco = document.createElement('p')
    pPreco['className'] = "preco"
    pPreco.textContent = produto.valor
    novaDiv.appendChild(pPreco)

    //Cria a marca
    //<p class = "marca">Urban</p>
    let pMarca = document.createElement('p')
    pMarca['className'] = "marca"
    pMarca.textContent = produto.marca
    novaDiv.appendChild(pMarca)
  }   
}


function carregaProdutos(dadosProdutos, categoria) {
  let containerCategoria = document.getElementById("containerCategoria")

  let child = containerCategoria.lastElementChild
  while (child){
    containerCategoria.removeChild(child)
    child = containerCategoria.lastElementChild
  }

  //Cria o título da categoria dentro do container
  let titulo = document.createElement('h1')
  titulo['className'] = "titulo"
  titulo.textContent = categoria
  containerCategoria.appendChild(titulo)

  //Carrega todos os produtos no container (div)
  let containerProdutos =  document.getElementById("containerProdutos")

  child = containerProdutos.lastElementChild
  while (child){
    containerProdutos.removeChild(child)
    child = containerProdutos.lastElementChild
  }

  for (let produto of dadosProdutos) {
    //Cria a div card para o produto
    let novaDiv = document.createElement('div')
    novaDiv['className'] = "card"
    containerProdutos.appendChild(novaDiv);

    //cria a imagem dentro da div do card
    let img = document.createElement('img')
    img['src'] = produto.img    
    novaDiv.appendChild(img)

    //Cria o titulo do produto na div
    //<h1 class="nome">Leave in Urban men</h1>
    let nH1 = document.createElement('h1');
    nH1['className'] = "nome"
    nH1.textContent = produto.titulo
    novaDiv.appendChild(nH1)

    //Cria o preco
    //<p class="preco">R$ 19.99</p>
    let pPreco = document.createElement('p')
    pPreco['className'] = "preco"
    pPreco.textContent = produto.valor
    novaDiv.appendChild(pPreco)

    //Cria a marca
    //<p class = "marca">Urban</p>
    let pMarca = document.createElement('p')
    pMarca['className'] = "marca"
    pMarca.textContent = produto.marca
    novaDiv.appendChild(pMarca)

    //Cria o botão
    //<p><button>Comprar</button></p>
    let pComprar = document.createElement('p')   
    novaDiv.appendChild(pComprar)
    let bBotao = document.createElement('button')
    bBotao['id'] = produto.id
    bBotao.onclick = comprarItemClick
    bBotao.textContent = "Comprar"
    pComprar.appendChild(bBotao)
  }   
}

const filterLivros = function(produto){
  return produto.categoria == "Livros"
}

const carregarLivrosClick = function(){ 
  apenasLivros = dadosProdutos.produtos.filter(filterLivros) 
  carregaProdutos(apenasLivros, "Livros")
}

const comprarItemClick = function (){
  console.log("Comprando item ", this.id)
  let produto = dadosProdutos.produtos.filter( produto => produto.id == this.id)[0]
  console.log(produto)
}

