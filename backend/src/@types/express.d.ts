/**
 * declare namespace sobrescreve a tipagem de uma interface já existente,
 * geralmente proveniente do node_modules.
 *
 * Não necessariamente substitui a tipagem selecionada, mas incrementa com
 * os tipos que colocamos dentro dela.
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string
    }
  }
}
