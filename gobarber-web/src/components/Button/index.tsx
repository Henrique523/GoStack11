import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

// Type serve para criar uma interface que nao possuira atributos (sera apenas outras tipagens)
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
)

export default Button
