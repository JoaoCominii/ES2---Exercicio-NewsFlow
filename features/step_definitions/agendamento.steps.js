const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')
const Servico = require('../support/dominio')

Given('que agora é {string}', function (dataHora) {
  this.servico.definirAgora(dataHora)
})

Given('que existe a edição {string} aprovada', function (titulo) {
  this.edicao = this.servico.criarEdicao(titulo, 'Marina')
  this.edicao.status = 'aprovada'
})

Given('que o segmento {string} tem {int} assinantes', function (nome, assinantes) {
  this.segmentos.push({ nome, assinantes })
})

Given('que escolhi {int} segmentos com {int} assinantes cada', function (quantidade, assinantes) {
  for (let i = 1; i <= quantidade; i++) this.segmentos.push({ nome: `Segmento ${i}`, assinantes })
})

When('agendo o envio para daqui a {int} minutos', function (minutos) {
  const quando = this.servico.agora + minutos * 60 * 1000
  this.resultado = this.servico.agendar(this.edicao, this.segmentos, quando)
})

Then('o disparo deve estar agendado', function () {
  assert.equal(this.edicao.status, 'agendada')
  assert.ok(this.edicao.disparo)
})

Then('o disparo deve estar agendado para {string}', function (esperado) {
  assert.equal(Servico.formatar(this.edicao.disparo.quando), esperado)
})

Then('nenhum disparo deve estar agendado', function () {
  assert.equal(this.servico.disparos.length, 0)
})
