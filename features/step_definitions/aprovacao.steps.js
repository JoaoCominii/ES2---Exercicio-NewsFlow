const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Given('que a edição {string} escrita por {string} aguarda revisão', function (titulo, autor) {
  this.edicao = this.servico.criarEdicao(titulo, autor)
  this.servico.enviarParaRevisao(this.edicao)
})

Given('que eu escrevi a edição {string}, que aguarda revisão', function (titulo) {
  this.edicao = this.servico.criarEdicao(titulo, this.usuario.nome)
  this.servico.enviarParaRevisao(this.edicao)
})

When('aprovo a edição', function () {
  this.resultado = this.servico.aprovar(this.edicao, this.usuario)
})

When('reprovo a edição com o comentário {string}', function (comentario) {
  this.resultado = this.servico.reprovar(this.edicao, this.usuario, comentario)
})

Then('a edição deve estar {string}', function (status) {
  assert.equal(this.edicao.status, status)
})

Then('o comentário {string} deve ficar registrado na edição', function (comentario) {
  assert.equal(this.edicao.comentario, comentario)
})
