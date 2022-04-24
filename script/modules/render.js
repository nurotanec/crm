import {getRandomNumber} from './utilities.js';

export const createRow = (obj) => {
  const count = document.querySelector('.table__body').childElementCount + 1;
  const id = obj.id === undefined ? getRandomNumber() : obj.id;
  const tr = document.createElement('tr');
  tr.innerHTML = `<td class="table__cell">${count}</td>
        <td class="table__cell table__cell_left table__cell_name"
            data-id="${id}">
        <span class="table__cell-id">id: ${id}</span>
        ${obj.title}</td>
        <td class="table__cell table__cell_left">${obj.category}</td>
        <td class="table__cell">${obj.units}</td>
        <td class="table__cell">${obj.count}</td>
        <td class="table__cell">$${obj.price}</td>
        <td class="table__cell">$${obj.price * obj.count}</td>
        <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic"></button>
        <button class="table__btn table__btn_edit"></button>
        <button class="table__btn table__btn_del"></button>
        </td>`;

  return tr;
};

export const renderGoods = (arr) => {
  const table = document.querySelector('.table__body');
  arr.forEach((obj) => {
    const elem = createRow(obj);
    table.append(elem);
  });
};
