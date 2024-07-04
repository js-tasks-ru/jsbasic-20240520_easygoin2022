import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.cards = this.products.map(product => new ProductCard(product));
    this.elem = this.render();
  }

  updateFilter = (filters) => {
    const gridInner = this.elem.querySelector('.products-grid__inner');

    if(filters.hasOwnProperty('noNuts')){
      this.filters.noNuts = filters.noNuts;
    } 
    else if(filters.hasOwnProperty('vegeterianOnly')){
      this.filters.vegeterianOnly = filters.vegeterianOnly;
    }
    else if(filters.hasOwnProperty('maxSpiciness')){
      this.filters.maxSpiciness = filters.maxSpiciness;
    }
    else if(filters.hasOwnProperty('category')){
      this.filters.category = filters.category;
    }
    
    let filteredGrid = this.products.filter(product => product);

    if(this.filters.noNuts){
      filteredGrid = filteredGrid.filter(product => !product.nuts);
    } 
    
    if(this.filters.vegeterianOnly){
      filteredGrid = filteredGrid.filter(product => product.vegeterian);
    }

    if(this.filters.maxSpiciness){
      filteredGrid = filteredGrid.filter(product => product.spiciness <= this.filters.maxSpiciness);
    }

    if(this.filters.category){
      filteredGrid = filteredGrid.filter(product => product.category === this.filters.category);
    }

    
    let renderedGrid = filteredGrid.map(item => new ProductCard(item));
    
    gridInner.innerHTML = renderedGrid.map(item => `${item.elem.outerHTML}`).join('');

  }

  template = () => {

    return `
    <div class="products-grid">
      <div class="products-grid__inner">
    `
    + this.cards.map(card => `${card.elem.outerHTML}`).join('') +
    `
     </div>
    </div>
    `
  }

  render = () => {
    this.elem = createElement(this.template());

    return this.elem;
  }
}
