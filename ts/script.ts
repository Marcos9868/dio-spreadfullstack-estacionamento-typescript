(function() {
  const $ = (query: string): HTMLInputElement | null => document.querySelector(query)

  $('#cadastrar')?.addEventListener("click", () => {
    const veiculo = $('#veiculo')?.value
    const placa = $('#placa')?.value
    if (!veiculo || !placa) {
      alert('Dados de Veículo e Placa obrigatórios!')
      return
    }
  })
})()