
export const getRandomNumber = () => (Math.floor(Math.random() *
  (99999999999999 - 10000000000000 + 1) + 10000000000000));

export const printBD = arr => {
  arr.forEach((item) => {
    const arr = [...item.children];
    console.log('№', arr[0].innerText);
    console.log('Наименование: ', arr[1].lastChild.textContent.trim());
    console.log('Категория: ', arr[2].innerText);
    console.log('Ед/изм: ', arr[3].innerText);
    console.log('Количество: ', arr[4].innerText);
    console.log('Цена: ', arr[5].innerText);
    console.log('Итог: ', arr[6].innerText);
  });
};

export const recalculatePrice = (output, count, price) => {
  output.value = `$ ${parseFloat(count * price).toFixed(2)}`;
};

export const recalculateTotalPrice = (list, totalPrice) => {
  let total = 0;
  [...list.children].forEach((item, index) => {
    item.children[0].textContent = index + 1;
    total += Number(item.children[6].innerHTML.slice(1));
  });

  totalPrice.innerText = `$ ${parseFloat(total).toFixed(2)}`;
};
