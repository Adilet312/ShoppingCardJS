export default class Product{
  constructor(productId,name,price){
    this.name = name;
    this.price = Number(price);
    this.productId = productId;
  }

  print(){
    let output = "Name: "+this.name +", Price: "+this.price;
    return output;
  }
}
