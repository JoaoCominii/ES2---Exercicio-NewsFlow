const { Given, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Given('que estou autenticado\\(a\\) como {word}', function (papel) {
  this.usuario = { nome: 'Carla', papel }
})

Then('devo ver a mensagem {string}', function (esperada) {
  assert.equal(this.resultado.mensagem, esperada)
})
