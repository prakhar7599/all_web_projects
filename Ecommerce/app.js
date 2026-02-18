const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productDOM = document.querySelector('.products-center');

//cart
let cart =[];
//buttons
let buttonsDOM = []
//getting products 
class Products{
async getProducts(){
  try {
    let result = await fetch('products.json');
    let data = await result.json()
    let products = data.items;
    products = products.map(item => {
      const {title,price} = item.fields;
      const {id} = item.sys
      const image = item.fields.image.fields.file.url;
      return{title,price,id,image}
    })
   return products
  } catch (error) {
    console.log(error);
  }

 }
}

// display 
class UI{
displayProducts(products){
 let result = ''
 products.forEach(product => {
   result+=`
   <!-- single product -->
    <article class="product">
      <div class="img-container">
        <img  src="${product.image}" class="product-img">
        <button class="bag-btn" data-id=${product.id}>
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
      <h3>${product.title}</h3>
      <h4>$ ${product.price}</h4>
    
    </article>
    <!-- End single product -->
   `
 });
 productDOM.innerHTML= result
 console.log(products);
}
getBegButtons(){
  const buttons = [...document.querySelectorAll('.bag-btn')];
  buttonsDOM = buttons;
  buttons.forEach(button =>{
    let id = button.dataset.id;
    let inCart = cart.find(item => item.id == id);
    if(inCart){
      button.innerHTML = "Added Succses!";
      button.disabled = true;
    }
    else{
      button.addEventListener('click',(event)=>{
        event.target.innerText = "Added Succses!";
        event.target.disabled = true

        //get product from products
        let cartItem = {...Storage.getProduct(id),amount:1}
        
        //add products to the cart
        cart =[...cart,cartItem]
        // save cart in local storage
        Storage.saveCart(cart)
        // set cart value 
        this.setCartValues(cart);
        //add cart item (display)
        this.addCartItem(cartItem);
        this.showCart()
      })
    }
  })
}
setCartValues(cart){
  let tempTotal = 0;
  let itemsTotal = 0;
  cart.forEach(item =>{
    tempTotal += item.price * item.amount;
    itemsTotal += item.amount;
  })
  cartTotal.innerText = parseFloat((tempTotal).toFixed(2));  // Problem 1
  cartItems.innerText = itemsTotal;
} 
addCartItem(item){
  const div = document.createElement('div');
  div.classList.add('cart-item');
  div.innerHTML=`
  <img src="${item.image}" alt="">
  <div>
    <h4>${item.title}</h4>
    <h5>$ ${item.price}</h5>
    <span class="remove-item data-id=${item.id}">remove</span>
  </div>
  <div>
    <i class="fas fa-chevron-up data-id=${item.id}""></i> <!-- Check this line -->
    <p class="item-amount">${item.amount}</p>
    <i class="fas fa-chevron-down data-id=${item.id}""></i> <!-- Also check this line -->
  </div>
  `;
  cartContent.appendChild(div);
  console.log(cartContent);
}

showCart(){
  cartOverlay.classList.add('transparentBcg')
  cartDOM.classList.add(('showCart'))
}
setupAPP() {
  cart = Storage.getCart();
  this.setCartValues(cart);
  this.populateCart(cart); 
  cartBtn.addEventListener('click', this.showCart);
  closeCartBtn.addEventListener('click', this.hideCart); 
}


hideCart(){
  cartOverlay.classList.remove('transparentBcg')
  cartDOM.classList.remove('showCart')
}
populateCart(cart) {
  cart.forEach(item => this.addCartItem(item));
}
cartLogic(){
  clearCartBtn.addEventListener('click',()=>{
    this.clearCart();
  })
  cartContent.addEventListener('click',(event)=>{
    if(event.target.classList.contains("remove-item")){
      let removeItem = event.target;
      let id = removeItem.dataset.id; 
      cartContent.removeChild(removeItem.parentElement.parentElement)
      this.removeItem(id);
    
    }
    else if(event.target.classList.contains("fa-chevron-up")){
      let addAmount = event.target;
    
      let id = addAmount.dataset.id; // Problem 2 
      
    
      let tempItem = cart.find(item => item.id ===id);
      console.log(tempItem); 
      Storage.saveCart(cart);
      this.setCartValues(cart);
      addAmount.nextElementSibling.innerText = tempItem.amount
    }
  })

}
clearCart(){
  let cartItems = cart.map(item => item.id)
  cartItems.forEach(id => this.removeItem(id))
  while(cartContent.children.length>0){
    cartContent.removeChild(cartContent.children[0])
  }
 this.hideCart()
}
removeItem(id){

  cart = cart.filter(item => item.id!== id);


  Storage.saveCart(cart);

  this.setCartValues(cart);


  let button = this.getSingleButton(id);
  button.disabled = false;
  button.innerHTML = `<i class="fas fa-shopping-cart"></i> Add to Cart`;
}

getSingleButton(id){
  console.log("Buttons:", buttonsDOM); // Check if buttonsDOM contains the buttons
  console.log("ID:", id); // Check the id being passed to the method
  const button = buttonsDOM.find(button => button.dataset.id === id);
  console.log("Button found:", button); // Check if a button with the specified id is found
  return button;
}
}



//local Storage
class Storage{
static saveProducts(products){
  localStorage.setItem('products',JSON.stringify(products))

}
static getProduct(id){
  let products = JSON.parse(localStorage.getItem('products'));
  return products.find(product => product.id === id);
}
static saveCart(){
  localStorage.setItem('cart',JSON.stringify(cart))
}
static getCart(){
  return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
}
}

document.addEventListener("DOMContentLoaded",()=>{
  const ui = new UI()
  const products = new Products();
  // setupAPp
  ui.setupAPP();
// get all products
products.getProducts().then(products =>{ 
  ui.displayProducts(products);
Storage.saveProducts(products);
}).then(()=>{
  ui.getBegButtons();
  ui.cartLogic();
})

});
