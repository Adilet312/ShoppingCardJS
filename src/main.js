import './css/main.scss';
import iPhone1 from './assets/images/iPhone1.jpg';
import iPhone2 from './assets/images/iPhone2.jpg';
import iPhone3 from './assets/images/iPhone3.jpg';
import iPhone4 from './assets/images/iPhone4.png';
import iPhone5 from './assets/images/iPhone5.png';
import iPhone6 from './assets/images/iPhone6.png';
import iPhone7 from './assets/images/iPhone7.png';
import iPhone8 from './assets/images/iPhone8.png';
import iPhone9 from './assets/images/iPhone9.png';
import uid from 'uid';
import Product from './Product.js';
import ListProducts from './ListProducts.js';
const products= [
  {
    id: 1,
    title: "Iphone 11",
    category: "Cell phone",
    price: 500.99,
    img: iPhone1,
    desc: `The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface.  `,
  },
  {
    id: 2,
    title: "Iphone 10",
    category: "Cell phone",
    price: 400.99,
    img: iPhone2,
    desc: `The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface.  `,
  },
  {
    id: 3,
    title: "Iphone 8",
    category: "Cell phone",
    price: 310,
    img: iPhone3,
    desc: `The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface. `,
  },
  {
    id: 4,
    title: "Iphone 7",
    category: "Cell phone",
    price: 230,
    img: iPhone4,
    desc: `The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface. `,
  },
  {
    id: 5,
    title: "Sumsung 10",
    category: "Cell phone",
    price: 22.99,
    img: iPhone5,
    desc: `The Samsung is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface. `,
  },
  {
    id: 6,
    title: "Samsung 6",
    category: "Cell phone",
    price: 600.10,
    img: iPhone6,
    desc: `The Samsung is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface. `,
  },
  {
    id: 7,
    title: "Sumsung 4",
    category: "Cell phone",
    price: 200.99,
    img: iPhone7,
    desc: `The Samsung 2 is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface.  `,
  },
  {
    id: 8,
    title: "Google Phone",
    category: "Cell phone",
    price: 900,
    img:iPhone8,
    desc: `The Google phone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface.  `,
  },
  {
    id: 9,
    title: "Google Phone 7",
    category: "Cell phone",
    price: 1200,
    img: iPhone9,
    desc: `The Google Phone 7 is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface. `,
  },

];

window.addEventListener('DOMContentLoaded',function(){
  /*Filling data*/
  let output = document.querySelector('#output');
  let ul = document.createElement('ul');
  let index = 0;
  let img ;
  let items = products.map( (product,idx) =>`
      <li class="product${index++}">
        <a href="#">
         <h4 class="productName">${product.title}</h4>
         <img src="${product.img}">
         <p class="price">${product.price}$</p>
         <div class="quantity">
          <input type="text" id="numberProducts" value="1">
          <span id="increase">+</span>
          <span id="decrease">-</span>
         </div>
        </a>
        <input type="submit" value="Add to Card" id="submitId">
      </li>
    `).join('');

    ul.innerHTML = items;
    output.appendChild(ul);

    /*Increasing and decreasing qty products and displaying qutities.*/
    let increase = document.querySelectorAll('#increase');
    let decrease = document.querySelectorAll('#decrease');
    let buttons = document.querySelectorAll('#submitId');
    let qty = 1;
    for(let idx = 0; idx < increase.length; idx++){
      increase[idx].addEventListener('click',function(e){
        let input = e.target.previousElementSibling;
        input.value=`${qty++}`
      })
    }
    for(let idx = 0; idx < decrease.length; idx++){
      decrease[idx].addEventListener('click',function(e){
        let input = e.target.previousElementSibling.previousElementSibling;
        console.log(input)
        Number(input.value) > 1 ? input.value=`${qty--}` : input.value=`${qty=1}`

      })
    }
    /*Adding product to SHopping cart*/
    let listProducts = new ListProducts();
    for(let idx = 0; idx < buttons.length; idx++){
      buttons[idx].addEventListener('click',function(){
      let quantities = document.querySelectorAll('#numberProducts');
      let prices = document.querySelectorAll('.price');
      let products = document.querySelectorAll('.productName');
      let images = document.querySelectorAll('img');
      for(let index = 0; index<quantities[idx].value; index++){
        let key = uid();
        let product = new Product(key,images[idx].src,products[idx].innerText,prices[idx].innerText.substring(0,prices[idx].innerText.length - 1));
        sessionStorage.setItem(key,JSON.stringify(product.print()));
        console.log(product);
        listProducts.addProduct(product);
      }
      let shoppingCardQty = document.querySelector('.basket');
      quantities[idx].value = "1";
      shoppingCardQty.innerText = listProducts.productId;
      qty = 1;
      })
    }
    /*Showing Shopping Cart*/
    document.querySelector('.basket').addEventListener('click',function(){
      let overlay =  document.createElement('div');
      overlay.className = "overlayClass";
      overlay.style.top = window.pageYOffset + "px";
      overlay.style.left =  window.pageXOffset + "px";
      overlay.style.width = window.innerWidth + "px";
      // overlay.style.height = window.innerHeight + "px";
      overlay.style.height = 1000 + "px";
      let summary = document.createElement('ul');
     summary.className = "output";
      for(let index = 0; index < listProducts.products.length; index++){
        let getProduct = JSON.parse(sessionStorage.getItem(`${listProducts.products[index].productId}`));
        let li = document.createElement('li');
        let img = document.createElement('img');
        let h4 = document.createElement('h4');
        let p = document.createElement('p');
        img.className = "checkOutImg";
        img.src = getProduct.img;
        h4.innerText = getProduct.name;
        p.innerText = getProduct.price+"$";
        let remove = document.createElement('span');
        remove.className = "removeShoppingCard";
        remove.innerText = "X";
        li.appendChild(remove);
        li.appendChild(img);
        li.appendChild(h4);
        li.appendChild(p);
        summary.appendChild(li);

      }
      let li = document.createElement('li');
      let h1 = document.createElement('h1');
      h1.innerText = "Total amount: "+ listProducts.total()+"$";
      li.appendChild(h1);
      summary.appendChild(li);
      overlay.appendChild(summary);
      document.body.appendChild(overlay);
    })

});
document.querySelector('body').addEventListener('click',function(e){
  let div = e.target;
  console.log(div)
  div.className==='overlayClass' && (div.parentNode.removeChild(div));


},false);

 /*Close icon*/
