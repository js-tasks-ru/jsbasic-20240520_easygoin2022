function highlight(table) {
  for( let i = 1; i < table.rows.length; i++){
    let teacher = table.rows[i];
    let status = teacher.cells[3];
    let gender = teacher.cells[2].textContent;
    let age = Number(teacher.cells[1].textContent);

    if(status.hasAttribute('data-available')){
        if(status.getAttribute('data-available') === 'true'){
            teacher.classList.add('available');
        } else {
            teacher.classList.add('unavailable');
        }
    } else {
        teacher.setAttribute('hidden', 'true');
    }

    if(gender === 'm'){
        teacher.classList.add('male');
    } else {
        teacher.classList.add('female');
    }

    if(age < 18){
        teacher.style.textDecoration = 'line-through';
    }
}
}
