export default class Product{
  constructor(name,price){
    this.name = name;
    this.price = Number(price);
  }

  print(){
    let output = "Name: "+this.name +"\nPrice: "+this.price;
    return output;
  }
}
