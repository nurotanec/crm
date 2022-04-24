
export const getAllElements = () => {
  const formOverlay = document.querySelector('.overlay');
  const modal = document.querySelector('.overlay__modal');
  const addButton = document.querySelector('.panel__add-goods');
  const list = document.querySelector('.table__body');
  const checkbox = document.querySelector('input[name="discount"]');
  const discountCode = document.querySelector('input[name="discount_count"]');
  const output = document.querySelector('.modal__total-price');
  const count = document.querySelector('input[name="count"]');
  const price = document.querySelector('input[name="price"]');
  const form = document.querySelector('.modal__form');
  const totalPrice = document.querySelector('.crm__total-price');

  return {
    formOverlay, modal, addButton, totalPrice,
    list, checkbox, discountCode, output, count, price, form,
  };
};
