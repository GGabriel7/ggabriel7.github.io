// ADICIONAR ITENS NA PAGINA
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("produtos-container");

    fetch("usuarios.json")
        .then(response => response.json())
        .then(produtos => {
            produtos.forEach(produto => {
                const card = document.createElement("div");
                card.classList.add("col-md-4", "mb-4");

                card.innerHTML = `
                    <div class="card">
                        <img src="
                        ${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text">R$ ${produto.valor.toFixed(2).replace(".", ",")}</p>
                            <a href="${produto.link}" class="btn btn-primary">Comprar</a>
                        </div>
                    </div>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Erro ao carregar os produtos:", error));
});

// PESQUISA
document.getElementById('search').addEventListener('input', function () {
    let searchValue = this.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let cards = document.querySelectorAll('#produtos-container .card');
    let hasResults = false;

    cards.forEach(card => {
        let title = card.querySelector('.card-title').textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let text = card.querySelector('.card-text').textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        if (searchValue === "" || title.includes(searchValue) || text.includes(searchValue)) {
            card.parentElement.style.display = 'block'; // Mostra o card
            hasResults = true;
        } else {
            card.parentElement.style.display = 'none'; // Esconde o card
        }
    });

    // Exibir mensagem de "Nenhum produto encontrado"
    document.getElementById('not-found').style.display = hasResults ? 'none' : 'block';
});
