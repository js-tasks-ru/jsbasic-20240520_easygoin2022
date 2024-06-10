function initCarousel() {
  const buttonLeft = document.querySelector('.carousel__arrow_left');
  const buttonRight = document.querySelector('.carousel__arrow_right');
  const carouselInner = document.querySelector('.carousel__inner');
  let step = 988;
  let currentPosition = 0;

  buttonLeft.style.display = 'none';

  buttonRight.addEventListener('click', () => {

    buttonLeft.style.display = '';

    if(currentPosition < step * 3){
      carouselInner.style.transform = `translateX(-${currentPosition + step}px)`;
      currentPosition += step;
    } 

    if(currentPosition > step * 2){
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
