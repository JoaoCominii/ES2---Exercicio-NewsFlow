# language: pt
Funcionalidade: US01 — Salvar rascunho automaticamente
  Como redator(a)
  Quero que meu texto seja salvo enquanto escrevo
  Para não perder trabalho quando a conexão cair

  Contexto:
    Dado que estou autenticado(a) como redator(a)
    E que existe a edição "Informativo #42" em rascunho

  @feliz
  Cenário: Texto salvo após 30 segundos sem digitar
    Dado que escrevi o texto "Olá, assinantes!"
    Quando eu espero 30 segundos sem digitar
    Então o rascunho deve ter 1 versão salva

  @excecao @limite
  Cenário: Nada é salvo antes de 30 segundos sem digitar
    Dado que escrevi o texto "Olá, assinantes!"
    Quando eu espero 29 segundos sem digitar
    Então o rascunho deve ter 0 versões salvas

  @limite
  Cenário: Apenas as 20 últimas versões são mantidas
    Dado que a edição já tem 20 versões salvas
    E que escrevi o texto "Texto novo"
    Quando eu espero 30 segundos sem digitar
    Então o rascunho deve ter 20 versões salvas
    E a versão 1 não deve estar mais disponível
    E a versão mais recente deve ser a 21

  @feliz
  Cenário: Restaurar uma versão não apaga as seguintes
    Dado que a edição "Informativo #43" tem as versões:
      | versão | texto               |
      | 1      | Primeiro parágrafo  |
      | 2      | Segundo parágrafo   |
      | 3      | Terceiro parágrafo  |
    Quando restauro a versão 2
    Então o texto da edição deve ser "Segundo parágrafo"
    E as 3 versões devem continuar disponíveis
