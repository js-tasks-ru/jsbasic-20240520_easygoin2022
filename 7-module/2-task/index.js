import createElement from '../../assets/lib/create-element.js';

export default class Modal { 
  constructor() {
    this.elem = this.render();
  }

  template = () => {
    return `
    <div class="modal">
    
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            
          </h3>
        </div>

        <div class="modal__body">
          
        </div>
      </div>

    </div>
    `;
  }

  open = () => {
    // const container = document.querySelector('.container');
    document.body.append(this.elem);

    document.body.classList.add('is-modal-open');
  }

  close = () => {
    this.elem.remove();

    document.body.classList.remove('is-modal-open');
  }

  
  btnClose = () => {
    const btn = this.elem.querySelector('.modal__close');
    btn.addEventListener('click', () => {
      this.close();
    })
  }
  

  keyClose = () => {
    document.addEventListener('keydown', event => {
      if(event.code == 'Escape'){
        this.close();
      }
    }, {once: true});
  }

  setTitle = (title) => {
    const modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  setBody = (html) => {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(html);
  }

  render = () => {

    this.elem = createElement(this.template());
    this.btnClose();
    this.keyClose();
    
    return this.elem;
  }
}
