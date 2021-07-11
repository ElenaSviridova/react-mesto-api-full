export default function renderLoading(isLoading, button) {
    if (isLoading) {
      button.textContent = 'Сохранение...';
    }
  }