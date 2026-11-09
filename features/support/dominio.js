// Domínio em memória do NewsFlow (suficiente para o exercício).
// Relógio controlado: nenhum teste usa sleep real.
const MINUTO = 60 * 1000
const HORA = 60 * MINUTO
const FUSO = -3 * HORA // America/Sao_Paulo (UTC-3, sem horário de verão)
const pad = (n) => String(n).padStart(2, '0')

class Servico {
  constructor () {
    this.agora = Servico.paraEpoch('10/03/2026 09:00')
    this.edicoes = []
    this.disparos = []
    this.emails = []
    this.assinantes = []
  }

  // "10/03/2026 09:00" (horário de São Paulo) -> epoch em ms
  static paraEpoch (texto) {
    const [, d, m, a, h, min] = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/.exec(texto)
    return Date.UTC(+a, +m - 1, +d, +h, +min) - FUSO
  }

  // epoch -> "10/03 às 9h30" (horário de São Paulo)
  static formatar (epoch) {
    const l = new Date(epoch + FUSO)
    return `${pad(l.getUTCDate())}/${pad(l.getUTCMonth() + 1)} às ${l.getUTCHours()}h${pad(l.getUTCMinutes())}`
  }

  definirAgora (texto) { this.agora = Servico.paraEpoch(texto) }

  avancarRelogio (ms) {
    let restante = ms
    while (restante > 0) {
      if (!this.edicoes.some((e) => e.pendente)) { this.agora += restante; return }
      const passo = Math.min(1000, restante)
      this.agora += passo
      restante -= passo
      this._salvarAutomatico()
    }
  }

  // ---------- RN01: rascunho e versões ----------
  criarEdicao (titulo, autor) {
    const edicao = {
      titulo, autor, texto: '', status: 'rascunho', versoes: [], proximoNumero: 1,
      pendente: false, ultimaEdicao: null, comentario: null, disparo: null
    }
    this.edicoes.push(edicao)
    return edicao
  }

  editar (edicao, texto) {
    edicao.texto = texto
    edicao.pendente = true
    edicao.ultimaEdicao = this.agora
  }

  definirVersoes (edicao, versoes) {
    edicao.versoes = versoes.map((v) => ({ numero: v.numero, texto: v.texto }))
    edicao.proximoNumero = Math.max(...versoes.map((v) => v.numero)) + 1
  }

  _salvarAutomatico () {
    for (const e of this.edicoes) {
      if (e.status === 'rascunho' && e.pendente && this.agora - e.ultimaEdicao >= 30 * 1000) {
        e.versoes.push({ numero: e.proximoNumero++, texto: e.texto })
        if (e.versoes.length > 20) e.versoes.shift()
        e.pendente = false
      }
    }
  }

  restaurarVersao (edicao, numero) {
    const versao = edicao.versoes.find((v) => v.numero === numero)
    if (!versao) return { ok: false, mensagem: 'Versão não encontrada' }
    edicao.texto = versao.texto
    edicao.pendente = false
    return { ok: true, mensagem: 'Versão restaurada' }
  }

  // ---------- RN02: aprovação ----------
  enviarParaRevisao (edicao) { edicao.status = 'em revisão' }

  aprovar (edicao, usuario) {
    if (edicao.autor === usuario.nome) return { ok: false, mensagem: 'Você não pode aprovar a própria edição' }
    edicao.status = 'aprovada'
    return { ok: true, mensagem: 'Edição aprovada' }
  }

  reprovar (edicao, usuario, comentario) {
    if (edicao.autor === usuario.nome) return { ok: false, mensagem: 'Você não pode reprovar a própria edição' }
    if (!comentario || !comentario.trim()) return { ok: false, mensagem: 'O comentário é obrigatório' }
    edicao.status = 'rascunho'
    edicao.comentario = comentario
    return { ok: true, mensagem: 'Edição devolvida ao rascunho' }
  }

  // ---------- RN02 + RN03 + RN04: agendamento ----------
  agendar (edicao, segmentos, quando) {
    if (edicao.status !== 'aprovada') return { ok: false, mensagem: 'A edição precisa ser aprovada antes do envio' }
    if (segmentos.length > 5) return { ok: false, mensagem: 'Uma edição aceita no máximo 5 segmentos' }
    if (segmentos.some((s) => s.assinantes === 0)) return { ok: false, mensagem: 'O segmento não tem assinantes' }
    if (quando - this.agora < 15 * MINUTO) return { ok: false, mensagem: 'O envio precisa de ao menos 15 minutos' }
    edicao.status = 'agendada'
    edicao.disparo = { segmentos, quando }
    this.disparos.push(edicao.disparo)
    return { ok: true, mensagem: 'Envio agendado' }
  }

  // ---------- RN06: descadastro e retorno ----------
  criarAssinante (email) {
    const assinante = { email, ativo: true, pedidoRetorno: null }
    this.assinantes.push(assinante)
    return assinante
  }

  _email (para, assunto) { this.emails.push({ para, assunto }) }

  descadastrar (assinante) {
    assinante.ativo = false
    this._email(assinante.email, 'Descadastro confirmado')
    return { ok: true, mensagem: 'Descadastro concluído' }
  }

  pedirRetorno (assinante) {
    assinante.pedidoRetorno = this.agora
    this._email(assinante.email, 'Confirme seu retorno à lista')
    return { ok: true, mensagem: 'Confirme o retorno pelo link enviado ao seu e-mail' }
  }

  confirmarRetorno (assinante) {
    if (this.agora - assinante.pedidoRetorno > 48 * HORA) {
      return { ok: false, mensagem: 'O link de confirmação expirou' }
    }
    assinante.ativo = true
    return { ok: true, mensagem: 'Bem-vindo de volta' }
  }
}

module.exports = Servico
