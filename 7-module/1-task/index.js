import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  template = () => {
    return `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
      ` + this.categories.map(ctg =>
        `
        <a href="#" class="ribbon__item" data-id="${ctg.id}">${ctg.name}</a>
        `).join('') + 
      `
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `;
  }

  scroll = () => {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');

  
    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    })

    arrowRight.addEventListener('click', () => {
      arrowLeft.classList.add('ribbon__arrow_visible');
      ribbonInner.scrollBy(350, 0);
    })

    ribbonInner.addEventListener('scroll', () => {

      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      
      if(scrollLeft <= 0){
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');
      }

      if(scrollRight < 1){
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowRight.classList.add('ribbon__arrow_visible');
      }

    })
  }

  onclick = () => {
    const items = this.elem.querySelectorAll('.ribbon__item');
    for(let i = 0; i < items.length; i++){

      let item = items[i];
      let id = this.categories[i].id;

      item.addEventListener('click', () => {

        item.preventDefault;

        for(i of items){
          i.classList.remove('ribbon__item_active');
        }
        
        item.classList.add('ribbon__item_active');

        let selectCategory = new CustomEvent('ribbon-select', {
          detail: id,
          bubbles: true
        })
        this.elem.dispatchEvent(selectCategory);
      })
    }
  }

  render() {
    this.elem = createElement(this.template());

    this.scroll();
    this.onclick();

    return this.elem;
  }
}
