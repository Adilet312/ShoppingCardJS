import './css/main.scss';
import img from './assets/images/item_1.jpeg';
import uid from 'uid';
import Product from './Product.js';
import ListProducts from './ListProducts.js';
const products= [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "item_1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./assets/images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./assets/images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./assets/images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./assets/images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./assets/images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./assets/images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./assets/images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./assets/images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },

];

window.addEventListener('DOMContentLoaded',function(){
  let output = document.querySelector('#output');
  let ul = document.createElement('ul');
  let index = 0;
  let items = products.map( product =>`
      <li class="product${index++}">
        <a href="#">
         <h4 class="productName">${product.title}</h4>
         <img src=${img}>
         <p class="price">${product.price}</p>
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
    let listProducts = new ListProducts();
    for(let idx = 0; idx < buttons.length; idx++){
      buttons[idx].addEventListener('click',function(){
      let quantities = document.querySelectorAll('#numberProducts');
      let prices = document.querySelectorAll('.price');
      let products = document.querySelectorAll('.productName');

      for(let index = 0; index<quantities[idx].value; index++){
        let key = uid();
        let product = new Product(key,products[idx].innerText,Number(prices[idx].innerText));
        sessionStorage.setItem(key,product.print());
        console.log(product)
        listProducts.addProduct(product);
      }
      let shoppingCardQty = document.querySelector('.basket');
      quantities[idx].value = "1";
      shoppingCardQty.innerText = listProducts.productId;
      qty = 1;
      })
    }
    document.querySelector('.basket').addEventListener('click',function(){
      let overlay =  document.createElement('ul');
      overlay.className = "overlayClass";
      overlay.style.listStyle = "none";
      overlay.style.margin = "0px auto";
      overlay.style.display = "flex";
      overlay.style.flexDirection = "column";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = "1";
      overlay.style.color = "white";
      overlay.style.padding = "0px";
      overlay.style.position = "absolute";
      overlay.style.top = window.pageYOffset + "px";
      overlay.style.left =  window.pageXOffset + "px";
      overlay.style.background = 'rgba(0,0,0,0.7)';
      overlay.style.width = window.innerWidth + "px";
      overlay.style.height = window.innerHeight + "px";
      for(let index = 0; index < listProducts.products.length; index++){
        let getProduct = sessionStorage.getItem(`${listProducts.products[index].productId}`);
        let li = document.createElement('li');
        li.innerText = getProduct;
        overlay.appendChild(li);

      }
      let li = document.createElement('li');
      li.innerText = "Total amount: "+ listProducts.total();
      overlay.appendChild(li);
      let x = document.createElement('span');
      x.className = "close";
      x.innerText = "X";
      overlay.appendChild(x);
      document.body.appendChild(overlay);
    })

});
document.querySelector('body').addEventListener('click',function(e){
  let ul = e.target;
  ul.tagName==='UL' && (ul.parentNode.removeChild(ul)); 


},false);

 /*Close icon*/
