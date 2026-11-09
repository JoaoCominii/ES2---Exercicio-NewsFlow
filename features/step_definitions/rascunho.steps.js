const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Given('que existe a edição {string} em rascunho', function (titulo) {
  this.edicao = this.servico.criarEdicao(titulo, this.usuario.nome)
})

Given('que escrevi o texto {string}', function (texto) {
  this.servico.editar(this.edicao, texto)
})

Given('que a edição já tem {int} versões salvas', function (quantidade) {
  const versoes = Array.from({ length: quantidade }, (_, i) => ({ numero: i + 1, texto: `Texto da versão ${i + 1}` }))
  this.servico.definirVersoes(this.edicao, versoes)
})

Given('que a edição {string} tem as versões:', function (titulo, tabela) {
  this.edicao = this.servico.criarEdicao(titulo, this.usuario.nome)
  const versoes = tabela.hashes().map((l) => ({ numero: Number(l['versão']), texto: l.texto }))
  this.servico.definirVersoes(this.edicao, versoes)
})

When('eu espero {int} segundos sem digitar', function (segundos) {
  this.avancarSegundos(segundos)
})

When('restauro a versão {int}', function (numero) {
  this.resultado = this.servico.restaurarVersao(this.edicao, numero)
})

Then('o rascunho deve ter {int} versão/versões salva/salvas', function (quantidade) {
  assert.equal(this.edicao.versoes.length, quantidade)
})

Then('a versão {int} não deve estar mais disponível', function (numero) {
  assert.ok(!this.edicao.versoes.some((v) => v.numero === numero))
})

Then('a versão mais recente deve ser a {int}', function (numero) {
  assert.equal(this.edicao.versoes[this.edicao.versoes.length - 1].numero, numero)
})

Then('o texto da edição deve ser {string}', function (texto) {
  assert.equal(this.edicao.texto, texto)
})

Then('as {int} versões devem continuar disponíveis', function (quantidade) {
  assert.equal(this.edicao.versoes.length, quantidade)
})
