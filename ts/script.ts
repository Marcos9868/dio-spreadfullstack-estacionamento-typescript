interface Veiculo {
  veiculo: string,
  placa: string,
  entrada: Date | string
}

(function() {
  const $ = (query: string): HTMLInputElement | null => document.querySelector(query)

  function calcTempo(mil: number) {
    const min = Math.floor(mil / 60000)
    const sec = Math.floor(mil % 60000)

    return `${min}m e ${sec}s`
  }

  function patio() {
    function lerVeiculos(): Veiculo[] {
      return localStorage.patio ? JSON.parse(localStorage.patio) : []
    }

    function salvarVeiculos(veiculos: Veiculo[]) {
      localStorage.setItem('patio', JSON.stringify(veiculos))
    }

    function adicionarVeiculos(veiculo: Veiculo, salva?: boolean) {
      const row = document.createElement('tr')

      row.innerHTML = `
        <td>${veiculo.veiculo}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td>
          <button class="delete" data-placa="${veiculo.placa}">X</button>
        </td>
      `
      row.querySelector(".delete")?.addEventListener("click", function() {
        removerVeiculos(this.dataset.placa)
      })

      $("#patio")?.appendChild(row)

      if(salva) salvarVeiculos([...lerVeiculos(), veiculo])
    }

    function removerVeiculos(placa: string) {
      const { entrada, veiculo } = lerVeiculos().find((veiculo) => veiculo.placa === placa)
      const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime())

      if (!confirm(`O veículo ${veiculo} permaneceu por ${tempo}. Deseja encerrar?`)) {
        return
      } else {
        window.alert('Obrigado por utilizar nosso serviço')
      }

      salvarVeiculos(lerVeiculos().filter((veiculo) => veiculo.placa !== placa))
      renderVeiculos()
    }

    function renderVeiculos() {
      $("#patio")!.innerHTML = ""
      const patio = lerVeiculos()

      if (patio.length) {
        patio.forEach((veiculo) => adicionarVeiculos(veiculo))
      }
    }

    return { lerVeiculos, adicionarVeiculos, removerVeiculos, salvarVeiculos, renderVeiculos }
  }

  patio().renderVeiculos()

  $('#cadastrar')?.addEventListener("click", () => {
    const veiculo = $('#veiculo')?.value
    const placa = $('#placa')?.value
    if (!veiculo || !placa) {
      alert('Dados de Veículo e Placa obrigatórios!')
      return
    }

    patio().adicionarVeiculos({ veiculo, placa, entrada: new Date().toISOString() }, true)
  })
})()