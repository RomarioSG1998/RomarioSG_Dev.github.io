document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

// Função para carregar o conteúdo da página dentro do contêiner
function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Define o conteúdo do contêiner como o conteúdo da página
            document.getElementById("page_content_container").innerHTML = this.responseText;

            if (window.innerWidth > 690) { // Verifica se a largura da janela é maior que 690 pixels
                // Remover a classe 'active' de todos os itens da barra lateral
                var sideItems = document.querySelectorAll("#side_items .side-item");
                sideItems.forEach(function(item) {
                    item.classList.remove('active');
                });
                // Adicionar a classe 'active' ao item clicado
                var clickedItem = document.querySelector("[onclick=\"loadPage('" + page + "')\"]");
                if (clickedItem) {
                    clickedItem.closest('.side-item').classList.add('active');
                }
            }
        } else if (this.readyState == 4 && this.status != 200) {
            alert("Erro ao carregar a página.");
        }
    };
    xhttp.open("GET", page, true);
    xhttp.send();
}

// Adicionar evento de clique aos itens da sidebar
function setupSidebarItems() {
    var sideItems = document.querySelectorAll("#side_items .side-item a");
    sideItems.forEach(function(link) {
        link.addEventListener('click', function(event) {
            if (window.innerWidth > 690) { // Apenas em telas grandes
                // Remover a classe 'active' de todos os itens
                var allItems = document.querySelectorAll("#side_items .side-item");
                allItems.forEach(function(item) {
                    item.classList.remove('active');
                });
                // Adicionar a classe 'active' ao item clicado
                link.closest('.side-item').classList.add('active');
            }
        });
    });
}

// Configurar itens da sidebar ao carregar a página
window.onload = function() {
    loadPage('home.html');
    setupSidebarItems();
}

// Função para alternar a visibilidade do avatar
function toggleAvatar() {
    var avatar = document.getElementById('user_avatar');
    avatar.classList.toggle('hidden');
}

function showTooltip(event) {
    // Obter o nome do botão a partir do conteúdo do elemento <span>
    var buttonName = event.target.querySelector('.item-description').innerText;

    // Criar um elemento para exibir o tooltip
    var tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = buttonName;

    // Definir a posição do tooltip
    tooltip.style.top = (event.clientY + 10) + 'px'; // 10 pixels abaixo do cursor
    tooltip.style.left = (event.clientX + 10) + 'px'; // 10 pixels à direita do cursor

    // Adicionar o tooltip ao corpo do documento
    document.body.appendChild(tooltip);

    // Exibir o tooltip
    tooltip.style.display = 'block';
}

// Função para esconder o tooltip ao retirar o mouse do botão
function hideTooltip() {
    // Remover o tooltip do corpo do documento
    var tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.parentNode.removeChild(tooltip);
    }
}

// Adicionar eventos de mouseover e mouseout aos elementos <a> dentro dos itens da barra lateral
var sideItemLinks = document.querySelectorAll('#side_items .side-item a');
sideItemLinks.forEach(function(link) {
    link.addEventListener('mouseover', showTooltip);
    link.addEventListener('mouseout', hideTooltip);
});
