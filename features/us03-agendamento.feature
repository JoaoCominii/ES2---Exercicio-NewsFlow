# language: pt
Funcionalidade: US03 — Agendar envio para segmentos
  Como gestor(a) de comunicação
  Quero agendar uma edição aprovada para segmentos específicos
  Para que cada público receba só o que interessa, no horário certo

  Contexto:
    Dado que estou autenticado(a) como gestor(a)
    E que agora é "10/03/2026 09:00"
    E que existe a edição "Informativo #42" aprovada

  @feliz
  Cenário: Agendamento com antecedência suficiente
    Dado que o segmento "Clientes Premium" tem 1200 assinantes
    Quando agendo o envio para daqui a 30 minutos
    Então o disparo deve estar agendado para "10/03 às 9h30"
    E devo ver a mensagem "Envio agendado"

  @limite
  Esquema do Cenário: Antecedência mínima de 15 minutos
    Dado que o segmento "Clientes Premium" tem 1200 assinantes
    Quando agendo o envio para daqui a <minutos> minutos
    Então devo ver a mensagem "<mensagem>"

    Exemplos:
      | minutos | mensagem                                |
      | 60      | Envio agendado                          |
      | 16      | Envio agendado                          |
      | 15      | Envio agendado                          |
      | 14      | O envio precisa de ao menos 15 minutos  |
      | 0       | O envio precisa de ao menos 15 minutos  |

  @excecao
  Cenário: Segmento sem assinantes bloqueia o agendamento
    Dado que o segmento "Clientes Inativos" tem 0 assinantes
    Quando agendo o envio para daqui a 30 minutos
    Então devo ver a mensagem "O segmento não tem assinantes"
    E nenhum disparo deve estar agendado

  @limite
  Esquema do Cenário: Máximo de 5 segmentos por edição
    Dado que escolhi <segmentos> segmentos com 100 assinantes cada
    Quando agendo o envio para daqui a 30 minutos
    Então devo ver a mensagem "<mensagem>"

    Exemplos:
      | segmentos | mensagem                                |
      | 1         | Envio agendado                          |
      | 5         | Envio agendado                          |
      | 6         | Uma edição aceita no máximo 5 segmentos |
