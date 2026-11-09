# NewsFlow BDD — do Gherkin ao Cucumber

Quatro histórias, 24 cenários em Gherkin e a suíte Cucumber.js que os executa, sobre o NewsFlow da Vértice.

## Como rodar
```
npm install
npm test          # executa a suíte e gera relatorios/cucumber-report.html
npm run test:dry  # valida sintaxe e passos, sem executar
```

## Estrutura
- `docs/historias.md` — US01 a US04, critérios, regras cobertas, prioridade.
- `features/*.feature` — um arquivo por história.
- `features/step_definitions/` e `features/support/` — steps, World e domínio em memória.
- `relatorios/cucumber-report.html` — relatório navegável da última execução.

## Rastreabilidade
| História | Regras | Cenários | Esquema do Cenário |
|---|---|---|---|
| US01 Salvar rascunho | RN01 | 4 | — |
| US02 Aprovar edição | RN02 | 5 | — |
| US03 Agendar envio | RN03, RN04 | 4 | 2 (5 e 3 linhas, com fronteiras 14/15/16 e 5/6) |
| US04 Descadastro | RN06 | 3 | 1 (47/48/49 horas) |

## Fora de escopo
- **RN05 (frequência semanal):** exige histórico de envios por assinante e fila de excedentes; é um conjunto de dados à parte, sem relação com as quatro histórias escolhidas.
- **RN07 (falha de entrega):** depende de simular tentativas com intervalos de 5, 15 e 45 minutos e tipos de bounce, o que merece uma história própria.
- **RN08 (notificações push):** janela de silêncio e limite diário são outro canal, independente do e-mail.
- **RN03, partes de reagendar e cancelar:** só a antecedência mínima foi coberta, que é a fronteira de maior risco.
- **RN04, deduplicação de assinante em dois segmentos:** exige base de assinantes por segmento; ficou para uma história futura.
- **RN01, o salvamento a cada 30 s:** foi interpretado como 30 s de inatividade, como no modelo do enunciado.

## Decisões
- Domínio em memória com relógio controlado: nenhum teste usa `sleep`.
- Estado sempre no World; nada em variável global.
- Mensagens e números aparecem no texto dos cenários, sem referência a tela, endpoint ou tabela.

## Saída de `npm test`
```
.............................................................................................................................................
24 scenarios (24 passed)
141 steps (141 passed)
0m 0.298s (0m 0.046s executing your code)
```
