interface Veiculo {
  veiculo: string,
  placa: string,
  entrada: Date
}

(function() {
  const $ = (query: string): HTMLInputElement | null => document.querySelector(query)

  function patio() {
    const lerVeiculos = () => {}
    const adicionarVeiculos = (veiculo: Veiculo) => {
      const row = document.createElement('tr')

      row.innerHTML = `
        <td>${veiculo.veiculo}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td>
          <button class="delete" data-placa="${veiculo.placa}">X</button>
        </td>
      `

      $("#patio")?.appendChild(row)
    }
    const removerVeiculos = () => {}
    const salvarVeiculos = () => {}
    const renderVeiculos = () => {}

    return { lerVeiculos, adicionarVeiculos, removerVeiculos, salvarVeiculos, renderVeiculos }
  }

  $('#cadastrar')?.addEventListener("click", () => {
    const veiculo = $('#veiculo')?.value
    const placa = $('#placa')?.value
    if (!veiculo || !placa) {
      alert('Dados de Veículo e Placa obrigatórios!')
      return
    }

    patio().adicionarVeiculos({ veiculo, placa, entrada: new Date })
  })
})()