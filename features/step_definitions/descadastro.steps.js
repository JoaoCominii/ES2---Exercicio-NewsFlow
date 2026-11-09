const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Given('que sou assinante da lista com o e-mail {string}', function (email) {
  this.assinante = this.servico.criarAssinante(email)
})

Given('que me descadastrei', function () {
  this.servico.descadastrar(this.assinante)
})

Given('que pedi para voltar para a lista', function () {
  this.servico.pedirRetorno(this.assinante)
})

When('solicito o descadastro pelo link do e-mail', function () {
  this.resultado = this.servico.descadastrar(this.assinante)
})

When('peço para voltar para a lista', function () {
  this.resultado = this.servico.pedirRetorno(this.assinante)
})

When('confirmo o retorno pelo link {int} horas depois do pedido', function (horas) {
  this.avancarHoras(horas)
  this.resultado = this.servico.confirmarRetorno(this.assinante)
})

Then('meu cadastro deve estar {word}', function (situacao) {
  assert.equal(this.assinante.ativo ? 'ativo' : 'inativo', situacao)
})

Then('devo receber um e-mail com o assunto {string}', function (assunto) {
  assert.ok(this.servico.emails.some((e) => e.para === this.assinante.email && e.assunto === assunto))
})
