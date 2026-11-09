const { setWorldConstructor } = require('@cucumber/cucumber')
const Servico = require('./dominio')

// O World é recriado a cada cenário: nenhum estado vaza de um para outro.
class MundoDoNewsFlow {
  constructor () {
    this.servico = new Servico()
    this.usuario = null
    this.edicao = null
    this.segmentos = []
    this.assinante = null
    this.resultado = null
  }

  avancarSegundos (segundos) { this.servico.avancarRelogio(segundos * 1000) }
  avancarHoras (horas) { this.servico.avancarRelogio(horas * 3600 * 1000) }
}

setWorldConstructor(MundoDoNewsFlow)
