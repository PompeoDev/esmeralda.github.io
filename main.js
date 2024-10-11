// main.js

// Função para calcular o valor da cravação
function calcularCravacao(pedras) {
    var valorCravacao = 0;
    if (pedras > 0) {
        if (pedras <= 2) {
            valorCravacao = pedras * 20;
        } else {
            valorCravacao = (2 * 20) + ((pedras - 2) * 10);
        }
    }
    return valorCravacao;
}

// Função para gerar o orçamento
function gerarOrcamento() {
    var quantidadeModelos = parseInt(document.getElementById("quantidadeModelos").value) || 1;
    var orcamento = "";

    for (var i = 0; i < quantidadeModelos; i++) {
        var modelo = document.getElementById("modelo" + i).value;
        var material = document.querySelector('input[name="material' + i + '"]:checked').value;
        var valorBase = parseFloat(document.getElementById("valor" + i).value) || 0;
        var prazo = document.getElementById("prazo" + i).value;
        var descontoPorcentagem = parseFloat(document.getElementById("desconto" + i).value) || 0;

        // Calcular desconto
        var desconto = (descontoPorcentagem / 100) * valorBase;

        // Opcionais
        var opcionalTexto = "";
        var valorOpcionais = 0;

        if (document.getElementById("banho" + i).checked) {
            opcionalTexto += "Banho de Ouro\n";
            valorOpcionais += 150;
        }
        if (document.getElementById("gravacao" + i).checked) {
            opcionalTexto += "Gravação\n";
            valorOpcionais += 15;
        }
        if (document.getElementById("cravacao" + i).checked) {
            var pedras = parseInt(document.getElementById("pedras" + i).value) || 0;
            opcionalTexto += `Cravação (${pedras} pedras)\n`;
            valorOpcionais += calcularCravacao(pedras);
        }

        // Verificar se há opcionais para exibir
        if (opcionalTexto !== "") {
            opcionalTexto = "Opcionais Selecionados:\n" + opcionalTexto;
        } else {
            opcionalTexto = ""; // Se não houver opcionais, limpar o texto
        }

        // Calcular valor final
        var valorFinal = valorBase + valorOpcionais - desconto;

        // Formatar mensagem de desconto, se houver
        var descontoMensagem = "";
        if (desconto > 0) {
            descontoMensagem = `De: R$ ${valorBase.toFixed(2)} Por: R$ ${valorFinal.toFixed(2)}\n`;
        } else {
            descontoMensagem = `Valor: R$ ${valorFinal.toFixed(2)}\n`;
        }

        // Adiciona cada orçamento de modelo no texto final
        orcamento += `Par de Alianças ${modelo} 💚✨\nMaterial: ${material}\n\n${descontoMensagem}Prazo de Entrega: ${prazo} dias úteis\n\n${opcionalTexto}\n\n-----------------------------------\n\n`;
    }

    // Texto final para todos os modelos
    orcamento += `Valor para pagamento à vista!\n\nParcelamos no cartão c/ acréscimo, basta nos informar que calculamos para você as parcelas!\n\n💚✨ O pedido acompanha uma caixinha de alianças e o certificado de garantia do material (não cobrimos mal uso, marcas de uso e desgaste do acabamento).`;

    // Atualizar campo de texto com o orçamento
    document.getElementById("resultado").value = orcamento;

    // Copiar automaticamente para a área de transferência
    navigator.clipboard.writeText(orcamento).then(function() {
        
    }, function(err) {
        alert('Falha ao copiar o texto: ' + err);
    });
}

// Função para atualizar os modelos com base na quantidade inserida
function atualizarModelos() {
    var quantidadeModelos = parseInt(document.getElementById("quantidadeModelos").value) || 1;  // Definindo valor padrão como 1 se estiver vazio
    var container = document.getElementById("modelosContainer");
    container.innerHTML = '';

    for (var i = 0; i < quantidadeModelos; i++) {
        var divModelo = document.createElement('div');
        divModelo.classList.add('ContainerAlianca');
        divModelo.innerHTML = `
            <h3>Modelo ${i + 1}</h3>
            <label for="modelo${i}">Selecione o Modelo da Aliança:</label>
            <select id="modelo${i}" name="modelo" required>
                <option value="Afrodite 2mm" selected>Afrodite 2mm</option>
                <option value="Afrodite 3mm">Afrodite 3mm</option>
                <option value="Afrodite 4mm">Afrodite 4mm</option>
                <option value="Maia 2mm">Maia 2mm</option>
                <option value="Maia 3mm">Maia 3mm</option>
                <option value="Maia 4mm">Maia 4mm</option>
                <option value="Atena 2mm">Atena 2mm</option>
                <option value="Atena 3mm">Atena 3mm</option>
                <option value="Atena 4mm">Atena 4mm</option>
                <option value="Hera 3mm">Hera 3mm</option>
                <option value="Hera 4mm">Hera 4mm</option>
                <option value="Nix 8mm">Nix 8mm</option>
                <option value="Irene 2mm">Irene 2mm</option>
                <option value="Irene 3mm">Irene 3mm</option>
                <option value="Irene 4mm">Irene 4mm</option> <!-- Valor padrão -->
                <option value="Vênus 3mm">Vênus 3mm</option>
                <option value="Vênus 4mm">Vênus 4mm</option>
                <option value="Obá 5mm">Obá 5mm</option>
                <option value="Aurora 3mm">Aurora 3mm</option>
                <option value="Luna 2mm">Luna 2mm</option>
                <option value="Isís 3,5mm">Isís 3,5mm</option>
                <option value="Héstia 3mm">Héstia 3mm</option>
                <option value="Personalizado">Personalizado</option>
            </select>
            <br><br>
            <label>Selecione o Material:</label>
            <div class="MaterialButton">
                <label><input type="radio" id="material${i}_ouro10k" name="material${i}" value="Ouro 10k" required> Ouro 10k</label><br> <!-- Valor padrão -->
                <label><input type="radio" id="material${i}_ouro14k" name="material${i}" value="Ouro 14k"> Ouro 14k</label><br>
                <label><input type="radio" id="material${i}_ouro18k" name="material${i}" value="Ouro 18k"> Ouro 18k</label><br>
                <label><input type="radio" id="material${i}_prata950" name="material${i}" value="Prata 950" checked> Prata 950</label><br>
                <label><input type="radio" id="material${i}_moedaantiga" name="material${i}" value="Moeda Antiga"> Moeda Antiga</label><br>
            </div>
            <br><br>
            <label for="valor${i}">Valor (R$):</label>
            <input type="number" id="valor${i}" name="valor" required step="0.01" value="89.00" placeholder="Ex: 1000.00"> <!-- Valor padrão -->
            <br><br>
            <label for="prazo${i}">Prazo de Entrega (dias úteis):</label>
            <input type="number" id="prazo${i}" name="prazo" required min="1" value="3"> <!-- Valor padrão -->
            <br><br>
            <h3>Opcionais:</h3>
            <label><input type="checkbox" id="banho${i}"> Banho de Ouro (+ R$ 150)</label><br>
            <label><input type="checkbox" id="gravacao${i}"> Gravação (+ R$ 15)</label><br>
            <label><input type="checkbox" id="cravacao${i}"> Cravação</label><br>
            <label for="pedras${i}">Quantidade de Pedras:</label>
            <input type="number" id="pedras${i}" name="pedras" min="0" value="0" placeholder="0"> <!-- Valor padrão -->
            <br><br>
            <label for="desconto${i}">Desconto (%):</label>
            <input type="number" id="desconto${i}" name="desconto" step="0.01" value="0" placeholder="Ex: 10"> <!-- Valor padrão -->
            <br><br>
        `;
        container.appendChild(divModelo);
    }
}

// Chamar a função ao carregar a página para garantir que os modelos sejam atualizados
document.addEventListener("DOMContentLoaded", function() {
    atualizarModelos();
});