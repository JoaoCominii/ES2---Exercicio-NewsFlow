# Histórias de usuário — NewsFlow

Quatro fatias verticais, cada uma percebida sozinha por um ator. Vocabulário conforme o Capítulo 02 do enunciado.

## US01 — Salvar rascunho automaticamente
**Como** redator(a)
**Quero** que meu texto seja salvo enquanto escrevo
**Para** não perder trabalho quando a conexão cair

**Critérios de aceitação**
- O rascunho é salvo após 30 segundos sem digitar.
- Cada salvamento cria uma versão numerada.
- Apenas as últimas 20 versões ficam disponíveis para restauração.
- Restaurar uma versão não apaga as seguintes.

**Regras cobertas:** RN01
**Prioridade:** Alta — perda de conteúdo é a reclamação número um dos redatores.
**Cenários:** features/us01-rascunho.feature

## US02 — Aprovar edição antes do envio
**Como** revisor(a)
**Quero** aprovar ou reprovar uma edição escrita por outra pessoa
**Para** que nada chegue aos 40 mil assinantes sem conferência

**Critérios de aceitação**
- Enviar ou agendar exige uma edição aprovada.
- O autor não aprova a própria edição.
- A reprovação devolve a edição ao rascunho.
- A reprovação exige um comentário.

**Regras cobertas:** RN02
**Prioridade:** Alta — um envio errado para a base inteira não pode ser desfeito.
**Cenários:** features/us02-aprovacao.feature

## US03 — Agendar envio para segmentos
**Como** gestor(a) de comunicação
**Quero** agendar uma edição aprovada para segmentos específicos
**Para** que cada público receba só o que interessa, no horário certo

**Critérios de aceitação**
- O envio exige no mínimo 15 minutos de antecedência, no fuso America/Sao_Paulo.
- Segmento com zero assinantes bloqueia o agendamento.
- Uma edição vai para no máximo 5 segmentos.
- O agendamento confirma o horário do disparo.

**Regras cobertas:** RN03 (antecedência e fuso), RN04 (segmento vazio e limite de 5)
**Prioridade:** Alta — é o ponto em que a edição realmente chega ao público.
**Cenários:** features/us03-agendamento.feature

## US04 — Descadastrar-se e voltar à lista
**Como** assinante
**Quero** sair da lista por um link no e-mail e voltar só se eu confirmar
**Para** controlar o que chega à minha caixa de entrada sem pedir ajuda ao suporte

**Critérios de aceitação**
- O descadastro pelo link tem efeito imediato.
- O assinante recebe um e-mail confirmando o descadastro.
- O retorno exige confirmação por link (duplo opt-in).
- O link de confirmação vale por 48 horas.

**Regras cobertas:** RN06
**Prioridade:** Média — obrigação de respeito ao assinante, mas afeta menos pessoas por vez que as três anteriores.
**Cenários:** features/us04-descadastro.feature

## Hipóteses assumidas
- O link de confirmação vale **até** 48 horas, inclusive: 48 h ainda é válido, 49 h expira.
- Os 29 segundos do cenário de borda do rascunho contam como inatividade a partir da última digitação.
- Quem reprova uma edição também não pode ser o autor dela (decorre de RN02).
