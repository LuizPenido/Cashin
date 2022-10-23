// Classe produto
class Product{
    constructor(id, name, price){
        this.id = id
        this.name = name
        this.price = price
        this.quantity = 0
    }
    // imprime todas as informacoes do produto
    print(){ 
      console.log("Id: " + this.id + " | Nome: " + this.name + " | Preco: " + this.price + " | Quantidade: " + this.quantity)
    }
    // muda a quantidade para o valor passado
    setQuantity(newQuantity){ 
      this.quantity = newQuantity
    }
    // soma a quantidade no valor passado
    updateQuantity(delta){ 
      this.quantity += delta
    }
    // reduz a quantidade do produto e retorna o preço total da compra deste produto
    buy(qtd){ 
      this.quantity -= qtd
      return qtd * price
    }
}
  
//Classe productList
class productList{
    constructor(){
        this.quantity = 0
        this.array = []
    }
    // verifica se já tem um produto com o id no array
    isThereId(id){
        let i = 0
        for(i = 0; i<this.quantity; i++){
            if(id == this.array[i].id){
                return true
            }
        }
        return false
    }
    // imprime todos os produtos e seus valores
    print(){
        let i=0
        for(i = 0; i<this.quantity; i++){
            this.array[i].print()
        }
    }
    // adiciona um novo produto no array, se seu valor for único
    addProduct(id, name, price){
        if(this.isThereId(id)){
            console.log("Erro: tentou inserir ID já existente (ID=" + id + ")")
        }
        else{
            let produto = new Product(id, name, price)
            this.array.push(produto)
            this.quantity += 1
        }
    }
    // muda a quantidade do produto para um valor fixo, se o id existir
    setQuantityProduct(id, qtd){
        if(this.isThereId(id)){
            let i=0
            for(i=0; i<this.quantity; i++){
                if(id == this.array[i].id){
                    this.array[i].setQuantity(qtd)
                }
            }
        }
        else{
            console.log("ID inválido (ID=" + id + ")")
        }
    }
    // varia a quantidade de um produto, se o id existir
    updateQuantityProduct(id, delta){
        if(this.isThereId(id)){
            let i=0
            for(i=0; i<this.quantity; i++){
                if(id == this.array[i].id){
                    this.array[i].updateQuantity(delta)
                }
            }
        }
        else{
            console.log("ID inválido (ID=" + id + ")")
        }
    }
    // remove o produto do array, se o id existir
    removeProduct(id){
        if(this.isThereId(id)){
            let i=0
            let index=-1
            for(i=0; i<this.quantity; i++){
                if(id == this.array[i].id){
                    index=i
                }
            }
            this.array.splice(index, 1)
            this.quantity -= 1
        }
        else{
            console.log("ID inválido (ID=" + id + ")")
        }
    }
    // compra um unico produto daquele id, e retorna o seu preço
    buy(id){
        if(this.isThereId(id)){
            let i=0
            for(i=0; i<this.quantity; i++){
                if(id == this.array[i].id){
                    if(this.array[i].quantity >= 1){
                        return this.array[i].buy(1)
                    }
                    else{
                        console.log("Quantidade insuficiente (ID=" + id + ")")
                        return 0
                    }
                }
            }
        }
        else{
            console.log("ID inválido (ID=" + id + ")")
        }
    }
    // faz a compra correspondendo a sequencia de ids oferecida
    sequenceBuy(idArray){
        let i=0
        let sum=0
        for(i=0; i<idArray.lenght; i++){
            sum += this.buy(idArray[i])
            console.log("Comprou um produto de id" + idArray[i])
        }
        return sum
    }
}
  
  /*
  
  // Log to console
  var produtoBatata = new Product(10, "Batata", 5)
  produtoBatata.setQuantity(10)
  
  produtoBatata.print()
  for(i = 0; i<10; i++){
    //console.log(i)
  }
  
  console.log("batata")*/
  
  //array = [1, 2]
  //array.push(3)
  
  //console.log(array)
  
lista = new productList()
  
lista.addProduct(4, "Batata", 5)
lista.setQuantityProduct(4, 5)
lista.addProduct(2, "Arroz", 10)
lista.setQuantityProduct(2, 10)
lista.addProduct(5, "Feijão", 2)
lista.setQuantityProduct(5, 20)
lista.addProduct(7, "Tomate", 20)
lista.setQuantityProduct(7, 1)

lista.addProduct(2, "ProdutoFalso", 6)

// comprando 2 batatas (10 reais), 3 arroz (30 reais), 5 feijoes (10 reais) e 2 tomates (20 reais, pois só tem um tomate)
// total deve ser 70 reais
let compra = [4, 4, 2, 2, 2, 5, 5, 5, 5, 5, 7, 7]
let valorTotal = lista.sequenceBuy(compra)

console.log("Valor total da compra = " + valorTotal)
  
lista.print()