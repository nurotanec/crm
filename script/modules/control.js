import * as util from './utilities.js';
import {renderGoods} from './render.js';

const {getRandomNumber, printBD, recalculatePrice,
  recalculateTotalPrice} = util;

const openModal = formOverlay => {
  formOverlay.classList.add('active');
};

const closeModal = (formOverlay, form) => {
  form.reset();
  formOverlay.classList.remove('active');
};

const openWindow = (url) => {
  const width = 470;
  const height = 700;
  const leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
  const topPosition = (window.screen.height / 2) - ((height / 2) + 50);
  const win = open('about:blank', '', `popup,width=${width},height=${height},
    resizable=no,left=${leftPosition},top=${topPosition},
    screenX=${leftPosition},screenY=${topPosition}`);
  win.document.write(`<img src="${url}">`);
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

const imgControl = (list) => {
  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__btn_pic')) {
      openWindow(target.getAttribute('data-pic'));
    }
  });
};

export default {
  modalControl,
  delControl,
  checkboxControl,
  formControl,
  totalPriceControl,
  imgControl,
};
