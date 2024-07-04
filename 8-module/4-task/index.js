import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if(product != null){
      
      let plusProduct = this.cartItems.find(item => item.product == product);
      if(plusProduct){
        plusProduct.count++;
        this.onProductUpdate(plusProduct);
      } else {
        let newProd = {
          product,
          count: 1
        }
        this.cartItems.push(newProd);
        this.onProductUpdate(newProd);
      }
    } else {
      return;
    }
  }

  updateProductCount(productId, amount) {
    let requiredProd = this.cartItems.find(item => item.product.id == productId);
    requiredProd.count += amount;
    
    if(requiredProd.count < 1){
        this.cartItems = this.cartItems.filter(item => item != requiredProd);
      } 
      
    this.onProductUpdate(requiredProd);
  }

  isEmpty() {
    return this.cartItems.length < 1;
  }

  getTotalCount() {
    let totalCount = 0;
    for(let item of this.cartItems){
      totalCount += item.count;
    }
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for(let item of this.cartItems){
      totalPrice += item.product.price * item.count;
    }
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form" name="order"
        action="https://httpbin.org/post"
        method="POST"
        enctype="multipart/form-data">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modal = new Modal();
    modal.open();
    modal.setTitle('Your order');


    let body = document.querySelector('.modal__body');
    let modalInfo = createElement(`<div class="modal__info"></div>`);
    body.append(modalInfo);
    
    for(let item of this.cartItems){
      modalInfo.append(this.renderProduct(item.product, item.count));
    }
    modalInfo.append(this.renderOrderForm());

    let cartProducts = document.querySelectorAll('.cart-product');

    for(let prod of cartProducts){
      let btnPlus = prod.querySelector('.cart-counter__button_plus');
      let btnMinus = prod.querySelector('.cart-counter__button_minus');
      let id = prod.getAttribute('data-product-id');
      
      btnPlus.addEventListener('click', () => {
        for(let item of this.cartItems){
          if(item.product.id == id){
            this.updateProductCount(id, 1);
            this.onProductUpdate(item);
          }
        }
      });

      btnMinus.addEventListener('click', () => {
        for(let item of this.cartItems){
          if(item.product.id == id){
            this.updateProductCount(id, -1);
            this.onProductUpdate(item);
          }
        }
      });
    }
    
    let form = modalInfo.querySelector('.cart-form');

    form.addEventListener('submit', (event) => {
      this.onSubmit(event);
    })
  }

  onProductUpdate(cartItem) {
    let productId = cartItem.product.id;
    let modal = document.querySelector('.modal');
    let productCount = document.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = document.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    let infoPrice = document.querySelector(`.cart-buttons__info-price`);

    if(document.body.classList.contains('is-modal-open')){
      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;

      let totalPrice = 0;
      for(let item of this.cartItems) {
        totalPrice += item.count * item.product.price;
      }

      infoPrice.innerHTML = `€${totalPrice.toFixed(2)}`;

      if(this.cartItems.length < 1){
        modal.remove();
        document.body.classList.remove('is-modal-open');
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const form = document.forms.order;
    const formData = new FormData(form);
    formData.append('order', JSON.stringify(this.cartItems));

    const promise = fetch(form.action, {
      method: 'POST',
      body: formData,
    })

    promise.then((response) => {
     if(response.ok){
      this.cartItems.length = 0;
      let title = document.querySelector(".modal__title");
      let modalBody = document.querySelector(".modal__body");
      title.innerHTML = `Success!`;
      modalBody.innerHTML = `
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`;
     } else {
      console.error(`Error: ${response.status}`);
     }
  })

    
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

