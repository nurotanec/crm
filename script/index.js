'use strict';

{
  const getRandomNumber = () => (Math.floor(Math.random() *
      (99999999999999 - 10000000000000 + 1) + 10000000000000));

  const createRow = (obj) => {
    const count = document.querySelector('.table__body').childElementCount + 1;
    const id = obj.id === undefined ? getRandomNumber() : obj.id;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="table__cell">${count}</td>
        <td class="table__cell table__cell_left table__cell_name" data-id="${id}">
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

  const renderGoods = (arr) => {
    const table = document.querySelector('.table__body');
    arr.forEach((obj) => {
      const elem = createRow(obj);
      table.append(elem);
    });
  };

  const goods =
        [
          {
            'id': 1,
            'title': 'Смартфон Xiaomi 11T 8/128GB',
            'price': 27000,
            'description': 'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
            'category': 'mobile-phone',
            'discont': false,
            'count': 3,
            'units': 'шт',
            'images': {
              'small': 'img/smrtxiaomi11t-m.jpg',
              'big': 'img/smrtxiaomi11t-b.jpg',
            },
          },
          {
            'id': 2,
            'title': 'Радиоуправляемый автомобиль Cheetan',
            'price': 4000,
            'description': 'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
            'category': 'toys',
            'discont': 5,
            'count': 1,
            'units': 'шт',
            'images': {
              'small': 'img/cheetancar-m.jpg',
              'big': 'img/cheetancar-b.jpg',
            },
          },
          {
            'id': 3,
            'title': 'ТВ приставка MECOOL KI',
            'price': 12400,
            'description': 'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
            'category': 'tv-box',
            'discont': 15,
            'count': 4,
            'units': 'шт',
            'images': {
              'small': 'img/tvboxmecool-m.jpg',
              'big': 'img/tvboxmecool-b.jpg',
            },
          },
          {
            'id': 4,
            'title': 'Витая пара PROConnect 01-0043-3-25',
            'price': 22,
            'description': 'Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.',
            'category': 'cables',
            'discont': false,
            'count': 420,
            'units': 'v',
            'images': {
              'small': 'img/lan_proconnect43-3-25.jpg',
              'big': 'img/lan_proconnect43-3-25-b.jpg',
            },
          },
        ];

  const printBD = arr => {
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

  const openModal = formOverlay => {
    formOverlay.classList.add('active');
  };

  const closeModal = (formOverlay, form) => {
    form.reset();
    formOverlay.classList.remove('active');
  };

  const recalculatePrice = (output, count, price) => {
    output.value = `$ ${parseFloat(count * price).toFixed(2)}`;
  };

  const recalculateTotalPrice = (list, totalPrice) => {
    let total = 0;
    [...list.children].forEach((item) => {
      total += Number(item.children[6].innerHTML.slice(1));
    });

    totalPrice.innerText = `$ ${parseFloat(total).toFixed(2)}`;
  };

  const modalControl = (addButton, formOverlay, form) => {
    addButton.addEventListener('click', () => {
      openModal(formOverlay);
      const id = getRandomNumber();
      document.querySelector('.vendor-code__id').textContent = id;
    });

    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay ||
          target.closest('.modal__close')) {
        closeModal(formOverlay, form);
      }
    });
  };

  const delControl = (list, totalPrice) => {
    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.table__btn_del')) {
        target.closest('tr').remove();
        console.log('База данных:');
        printBD([...list.children]);
        recalculateTotalPrice(list, totalPrice);
      }
    });
  };

  const checkboxControl = (checkbox, discountCode) => {
    checkbox.addEventListener('change', e => {
      e.preventDefault();
      discountCode.toggleAttribute('disabled');
      discountCode.value = '';
    });
  };

  const formControl = (modal, formOverlay, form, list, totalPrice) => {
    modal.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newGood = Object.fromEntries(formData);
      newGood.id = document.querySelector('.vendor-code__id').textContent;
      console.log('newGood: ', newGood);

      renderGoods([newGood]);
      closeModal(formOverlay, form);
      recalculateTotalPrice(list, totalPrice);
    });
  };

  const totalPriceControl = (form, count, price, output) => {
    form.addEventListener('keyup', e => {
      const target = e.target;
      if (target === count || target === price) {
        recalculatePrice(output, count.value, price.value);
      }
    });
  };

  const getAllElements = () => {
    const formOverlay = document.querySelector('.overlay');
    const modal = document.querySelector('.overlay__modal');
    const addButton = document.querySelector('.panel__add-goods');
    const closeButton = document.querySelector('.modal__close');
    const list = document.querySelector('.table__body');
    const checkbox = document.querySelector('input[name="discount"]');
    const discountCode = document.querySelector('input[name="discount_count"]');
    const output = document.querySelector('.modal__total-price');
    const count = document.querySelector('input[name="count"]');
    const price = document.querySelector('input[name="price"]');
    const form = document.querySelector('.modal__form');
    const totalPrice = document.querySelector('.crm__total-price');

    return {
      formOverlay, modal, addButton, closeButton, totalPrice,
      list, checkbox, discountCode, output, count, price, form,
    };
  };

  const init = () => {
    renderGoods(goods);

    const {
      formOverlay, modal, addButton, closeButton, totalPrice,
      list, checkbox, discountCode, output, count, price, form,
    } = getAllElements();

    recalculateTotalPrice(list, totalPrice);

    modalControl(addButton, formOverlay, form);
    delControl(list, totalPrice);
    checkboxControl(checkbox, discountCode);
    formControl(modal, formOverlay, form, list, totalPrice);
    totalPriceControl(form, count, price, output);
  };

  window.crmInit = init;
}
