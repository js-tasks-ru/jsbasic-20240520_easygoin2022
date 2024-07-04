export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

