import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
  }

  render = () => {
    this.elem = createElement(this.template());
    this.onClick();

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    thumb.addEventListener('pointerdown', this.onDown);

    return this.elem;
 }

  template = () => {

    let result = '<span class="slider__step-active"></span>';

    for(let i = 1; i < this.steps; i++){
      result+=`<span></span>`;
    }

    return `
    <div class="slider">

      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">0</span>
      </div>

      <div class="slider__progress" style="width: 0%;"></div>

      <div class="slider__steps">
    ` + result + `
      </div>
    </div>
    `
  }

  onDown = () => {
    document.addEventListener('pointermove', this.onMove);
    document.addEventListener('pointerup', this.onUp, { once: true });
  }

  onMove = (event) => {
    this.elem.classList.add('slider_dragging');

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');
    

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;

    let value = Math.round(approximateValue);
    sliderValue.textContent = value;
    
  }

  onUp = (event) => {
    document.removeEventListener('pointermove', this.onMove);

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderSteps = this.elem.querySelector('.slider__steps')
    let steps = sliderSteps.querySelectorAll('span');

   
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;

    let value = Math.round(approximateValue);
    let bounceValue = value * 25;

    thumb.style.left = `${bounceValue}%`;
    progress.style.width = `${bounceValue}%`;

    for(let step of steps){
      step.classList.remove('slider__step-active');
    }
    steps[value].classList.add('slider__step-active');

    let changeStep = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    });

    this.elem.dispatchEvent(changeStep);
    
  }

  onClick = () => {
    this.elem.addEventListener('click', (event) => {
      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');
      let sliderValue = this.elem.querySelector('.slider__value');
      let sliderSteps = this.elem.querySelector('.slider__steps')
      let steps = sliderSteps.querySelectorAll('span');

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);

      sliderValue.textContent = value;
      for(let step of steps){
        step.classList.remove('slider__step-active');
      }
      steps[value].classList.add('slider__step-active');

      let changeStep = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      });

      this.elem.dispatchEvent(changeStep);
      
      let valuePercents = value / segments * 100;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
    })
  }

}
