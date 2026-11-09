# language: pt
Funcionalidade: US02 — Aprovar edição antes do envio
  Como revisor(a)
  Quero aprovar ou reprovar uma edição escrita por outra pessoa
  Para que nada chegue aos 40 mil assinantes sem conferência

  Contexto:
    Dado que estou autenticado(a) como revisor(a)

  @feliz
  Cenário: Revisor(a) aprova a edição de outra pessoa
    Dado que a edição "Informativo #42" escrita por "Marina" aguarda revisão
    Quando aprovo a edição
    Então devo ver a mensagem "Edição aprovada"
    E a edição deve estar "aprovada"

  @excecao
  Cenário: Autor(a) não aprova a própria edição
    Dado que eu escrevi a edição "Informativo #42", que aguarda revisão
    Quando aprovo a edição
    Então devo ver a mensagem "Você não pode aprovar a própria edição"
    E a edição deve estar "em revisão"

  @feliz
  Cenário: Reprovação com comentário devolve a edição ao rascunho
    Dado que a edição "Informativo #42" escrita por "Marina" aguarda revisão
    Quando reprovo a edição com o comentário "Corrigir o título"
    Então devo ver a mensagem "Edição devolvida ao rascunho"
    E a edição deve estar "rascunho"
    E o comentário "Corrigir o título" deve ficar registrado na edição

  @excecao
  Cenário: Reprovação sem comentário é recusada
    Dado que a edição "Informativo #42" escrita por "Marina" aguarda revisão
    Quando reprovo a edição com o comentário ""
    Então devo ver a mensagem "O comentário é obrigatório"
    E a edição deve estar "em revisão"

  @excecao
  Cenário: Edição sem aprovação não pode ser agendada
    Dado que a edição "Informativo #42" escrita por "Marina" aguarda revisão
    E que o segmento "Clientes Premium" tem 1200 assinantes
    Quando agendo o envio para daqui a 30 minutos
    Então devo ver a mensagem "A edição precisa ser aprovada antes do envio"
    E nenhum disparo deve estar agendado
