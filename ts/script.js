(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor(mil % 60000);
        return `${min}m e ${sec}s`;
    }
    function patio() {
        function lerVeiculos() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvarVeiculos(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        function adicionarVeiculos(veiculo, salva) {
            var _a, _b;
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${veiculo.veiculo}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td>
          <button class="delete" data-placa="${veiculo.placa}">X</button>
        </td>
      `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                removerVeiculos(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvarVeiculos([...lerVeiculos(), veiculo]);
        }
        function removerVeiculos(placa) {
            const { entrada, veiculo } = lerVeiculos().find((veiculo) => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veículo ${veiculo} permaneceu por ${tempo}. Deseja encerrar?`)) {
                return;
            }
            else {
                window.alert('Obrigado por utilizar nosso serviço');
            }
            salvarVeiculos(lerVeiculos().filter((veiculo) => veiculo.placa !== placa));
            renderVeiculos();
        }
        function renderVeiculos() {
            $("#patio").innerHTML = "";
            const patio = lerVeiculos();
            if (patio.length) {
                patio.forEach((veiculo) => adicionarVeiculos(veiculo));
            }
        }
        return { lerVeiculos, adicionarVeiculos, removerVeiculos, salvarVeiculos, renderVeiculos };
    }
    patio().renderVeiculos();
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const veiculo = (_a = $('#veiculo')) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        if (!veiculo || !placa) {
            alert('Dados de Veículo e Placa obrigatórios!');
            return;
        }
        patio().adicionarVeiculos({ veiculo, placa, entrada: new Date().toISOString() }, true);
    });
})();
