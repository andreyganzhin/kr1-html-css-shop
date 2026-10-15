document.addEventListener('DOMContentLoaded', () => {
  // ===============================
  // Модальное окно заявки
  // ===============================

  const orderDialog = document.getElementById('order-dialog');
  const orderForm = document.getElementById('order-form');
  const closeDialogButton = document.getElementById('close-order-dialog');
  const closeDialogIcon = document.getElementById('close-order-dialog-icon');
  const successMessage = document.getElementById('success-message');
  const orderButtons = document.querySelectorAll('.product-card__button');
  const selectedProductInput = document.getElementById('selected-product');
  const selectedProductName = document.getElementById('selected-product-name');

  // Работаем с модальным окном только если оно есть на странице
  if (orderDialog && orderForm) {
    // --- Открытие окна ---
    orderButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const productName = button.dataset.product || '—';

        if (selectedProductInput) {
          selectedProductInput.value = productName;
        }
        if (selectedProductName) {
          selectedProductName.textContent = productName;
        }

        orderDialog.showModal();

        // Автофокус на первое поле
        const firstInput = orderDialog.querySelector('.order-form__input');
        if (firstInput) {
          firstInput.focus();
        }
      });
    });

    // --- Закрытие: кнопка «Закрыть» ---
    if (closeDialogButton) {
      closeDialogButton.addEventListener('click', () => {
        orderDialog.close();
      });
    }

    // --- Закрытие: крестик ---
    if (closeDialogIcon) {
      closeDialogIcon.addEventListener('click', () => {
        orderDialog.close();
      });
    }

    // --- Закрытие: клик по фону (backdrop) ---
    orderDialog.addEventListener('click', (event) => {
      const rect = orderDialog.getBoundingClientRect();
      const isInDialog =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInDialog) {
        orderDialog.close();
      }
    });

    // --- Отправка формы ---
    orderForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formElements = Array.from(orderForm.elements);

      // Сброс ошибок
      formElements.forEach((el) => {
        if (el.willValidate) el.removeAttribute('aria-invalid');
      });

      // Валидация
      if (!orderForm.checkValidity()) {
        formElements.forEach((el) => {
          if (el.willValidate && !el.checkValidity()) {
            el.setAttribute('aria-invalid', 'true');
          }
        });
        orderForm.reportValidity();
        return;
      }

      // Успех
      if (successMessage) {
        successMessage.hidden = false;

        // Автоскрытие сообщения через 4 секунды
        setTimeout(() => {
          successMessage.hidden = true;
        }, 4000);
      }

      orderForm.reset();
      if (selectedProductName) selectedProductName.textContent = '—';

      orderDialog.close();
    });
  }

  // ===============================
  // Кнопка «Наверх»
  // ===============================

  const scrollTopButton = document.querySelector('.scroll-top');

  if (scrollTopButton) {
    // Показываем кнопку после 300px прокрутки
    const toggleScrollTopButton = () => {
      scrollTopButton.hidden = window.scrollY <= 300;
    };

    window.addEventListener('scroll', toggleScrollTopButton);
    toggleScrollTopButton();

    // Скролл наверх по клику
    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
});