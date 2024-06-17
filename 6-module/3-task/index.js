import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  template() {
    return `
    <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">` + this.slides.map(slide => `
          <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${(slide.price).toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
          `).join('') + `
        </div>
    </div>`;
  }


  btnOnCLick = () => {

    const btns = this.elem.querySelectorAll('.carousel__button');

    for(let i = 0; i < btns.length; i++){
      btns[i].addEventListener('click', () => {
        let id = this.slides[i].id;
        let addProduct = new CustomEvent("product-add", { 
          detail: id, 
          bubbles: true
        });
          this.elem.dispatchEvent(addProduct);
      });
    }
  }

  initSlider = (offsetWidth) => {
    
    let step = offsetWidth;
    let currentPosition = 0;

    const buttonLeft = this.elem.querySelector('.carousel__arrow_left');
    const buttonRight = this.elem.querySelector('.carousel__arrow_right');
    const carouselInner = this.elem.querySelector('.carousel__inner');
     
    
    buttonLeft.style.display = 'none';
  
    buttonRight.addEventListener('click', () => {
  
      buttonLeft.style.display = '';
  
      if(currentPosition < this.slides.length * step){
        carouselInner.style.transform = `translateX(-${currentPosition + step}px)`;
        currentPosition += step;
      } 
  
      if(currentPosition > (this.slides.length - 2) * step){
        buttonRight.style.display = 'none';
      }
      
    });
  
    buttonLeft.addEventListener('click', () => {
      
      buttonRight.style.display = '';
      
      if(currentPosition > 0){
        carouselInner.style.transform = `translateX(-${currentPosition - step}px)`;
        currentPosition -= step;
      } 
  
      if(currentPosition < step){
        buttonLeft.style.display = 'none';
      }

    })
  }

  
  render() {
    
    this.elem = createElement(this.template());

    this.btnOnCLick();
   
    return this.elem;
  }
}
