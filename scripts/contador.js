function atualizarContador() {
  const agora = new Date();
  const dataFinal = new Date("2026-04-17T00:00:00");

  const diferenca = dataFinal - agora;

  const contador = document.getElementById("contador");

  if (!contador) return;

  if (diferenca <= 0) {
    contador.innerHTML = "Chegou o grande dia!";
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
  const segundos = Math.floor((diferenca / 1000) % 60);

  contador.innerHTML = `
    ${dias} dias<br>
    ${horas}h ${minutos}m ${segundos}s
  `;
}

atualizarContador();
setInterval(atualizarContador, 1000);
