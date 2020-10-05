export default class Product{

  constructor(productId,image,name,price){
    this.image = image;
    this.name = name;
    console.log("Product price: ",price)
    this.price = Number(price);
    this.productId = productId;
  }

  print(){
    // let output = "Name: "+this.name +", Price: "+this.price;
    // return output;
    return {img:this.image,name:this.name,price:this.price}
  }

}
