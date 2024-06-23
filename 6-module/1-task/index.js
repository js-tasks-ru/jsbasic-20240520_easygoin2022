/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
}


render() {
  this.elem = document.createElement('table');
  
  let result = 
    `<thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
      </thead>
      <tbody>` + this.rows.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.salary}</td>
            <td>${user.city}</td>
            <td><button>X</button></td>
        </tr>
      `).join('') + `</tbody>`;

    this.elem.innerHTML = result;

    for(let btn of this.elem.querySelectorAll('button')){
      btn.addEventListener('click', () => {
        btn.parentElement.parentElement.remove();
      })
    }

    return this.elem;
}
}