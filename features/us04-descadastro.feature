# language: pt
Funcionalidade: US04 — Descadastrar-se e voltar à lista
  Como assinante
  Quero sair da lista por um link no e-mail e voltar só se eu confirmar
  Para controlar o que chega à minha caixa de entrada sem pedir ajuda ao suporte

  Contexto:
    Dado que sou assinante da lista com o e-mail "ana@exemplo.com.br"

  @feliz
  Cenário: Descadastro pelo link tem efeito imediato
    Quando solicito o descadastro pelo link do e-mail
    Então devo ver a mensagem "Descadastro concluído"
    E meu cadastro deve estar inativo
    E devo receber um e-mail com o assunto "Descadastro confirmado"

  @excecao
  Cenário: Pedir para voltar não reativa o cadastro sem confirmação
    Dado que me descadastrei
    Quando peço para voltar para a lista
    Então devo ver a mensagem "Confirme o retorno pelo link enviado ao seu e-mail"
    E meu cadastro deve estar inativo

  @limite
  Esquema do Cenário: Link de confirmação vale por 48 horas
    Dado que me descadastrei
    E que pedi para voltar para a lista
    Quando confirmo o retorno pelo link <horas> horas depois do pedido
    Então devo ver a mensagem "<mensagem>"
    E meu cadastro deve estar <situação>

    Exemplos:
      | horas | mensagem                       | situação |
      | 47    | Bem-vindo de volta             | ativo    |
      | 48    | Bem-vindo de volta             | ativo    |
      | 49    | O link de confirmação expirou  | inativo  |
