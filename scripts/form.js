document.addEventListener("DOMContentLoaded", function () {

  // 🔑 Inicializa EmailJS com sua chave
  emailjs.init("ucyVSRDk_seOzq7dz");

  const form = document.getElementById("formConfirmacao");
  const quantidade = document.getElementById("quantidade");
  const nomesContainer = document.getElementById("nomesContainer");
  const whatsappInput = document.getElementById("whatsapp");

  const radiosPresenca = document.querySelectorAll('input[name="presenca"]');

  // 👉 Se marcar "Não", limpa campos
  radiosPresenca.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "Não" && radio.checked) {
        quantidade.value = "";
        nomesContainer.innerHTML = "";
      }
    });
  });

  // 👉 Gerar campos de nomes
  quantidade.addEventListener("change", () => {
    nomesContainer.innerHTML = "";

    const total = parseInt(quantidade.value);

    if (!total) return;

    for (let i = 1; i <= total; i++) {
      const div = document.createElement("div");
      div.classList.add("mb-2");

      div.innerHTML = `
        <label>Nome ${i}</label>
        <input type="text" class="form-control nome" placeholder="Digite o nome" required>
      `;

      nomesContainer.appendChild(div);
    }
  });

  // 📱 Máscara WhatsApp
  whatsappInput.addEventListener("input", () => {
    let value = whatsappInput.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else {
      value = value.replace(/^(\d*)$/, "($1");
    }

    whatsappInput.value = value;
  });

  // 🚀 Envio do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const presencaSelecionada = document.querySelector('input[name="presenca"]:checked');

    if (!presencaSelecionada) {
      alert("Selecione se você irá ao evento.");
      return;
    }

    const presenca = presencaSelecionada.value;
    const whatsapp = whatsappInput.value.trim();

    // 🕒 Data/hora
    const agora = new Date().toLocaleString();

    // ❌ Se não vai
    if (presenca === "Não") {
      enviarEmail({
        presenca: "Não",
        quantidade: 0,
        nomes: "Não comparecerá",
        whatsapp: whatsapp,
        time: agora
      });
      return;
    }

    // ✅ Validar quantidade
    if (!quantidade.value) {
      alert("Selecione a quantidade de pessoas.");
      return;
    }

    // ✅ Validar nomes
    const nomesInputs = document.querySelectorAll(".nome");
    const nomes = [];

    for (let input of nomesInputs) {
      if (!input.value.trim()) {
        alert("Preencha todos os nomes.");
        return;
      }
      nomes.push(input.value.trim());
    }

    // ✅ Validar WhatsApp
    if (!whatsapp) {
      alert("Informe o WhatsApp.");
      return;
    }

    const templateParams = {
      presenca: presenca,
      quantidade: nomes.length,
      nomes: nomes.join(", "),
      whatsapp: whatsapp,
      time: agora
    };

    enviarEmail(templateParams);
  });

  // 📧 Função de envio
  function enviarEmail(params) {
    emailjs.send("service_7gdi6xj", "template_8uf563m", params)
      .then(() => {
        alert("Confirmação enviada com sucesso!");
        form.reset();
        nomesContainer.innerHTML = "";
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao enviar. Tente novamente.");
      });
  }

});