function copiarTexto() {
  const input = document.getElementById("textToCopy");

  // Seleciona o texto (melhora compatibilidade)
  input.select();
  input.setSelectionRange(0, 99999);

  // Copia
  navigator.clipboard.writeText(input.value)
    .then(() => {
      mostrarToast();
    })
    .catch(err => {
      console.error("Erro ao copiar:", err);
    });
}

function mostrarToast() {
  const toastElement = document.getElementById("toastCopy");
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}