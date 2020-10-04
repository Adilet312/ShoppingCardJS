export default class ListProducts {
  constructor(){
    this.products = [];
    this.productId = 0;
  }
  addProduct(product){
    this.productId = this.increaseId();
    this.products.push(product);
  }
  increaseId(){
    this.productId+=1;
    return this.productId;
  }
  total(){
    let total = this.products.reduce((acc,product) => {
      return acc + product.price;
    },0)
    return total;
  }
}
