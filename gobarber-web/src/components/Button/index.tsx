import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

// Type serve para criar uma interface que nao possuira atributos (sera apenas outras tipagens)
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
)

export default Button
