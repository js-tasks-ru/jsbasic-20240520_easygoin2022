import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
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

  render = () => {
     this.elem = createElement(this.template());
     this.onClick();

     return this.elem;
  }
}
