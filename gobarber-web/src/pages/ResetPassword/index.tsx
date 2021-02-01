import React, { useCallback, useRef } from 'react'
import { FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useHistory, useLocation } from 'react-router-dom'

import { useToast } from '../../hooks/Toast'
import Input from '../../components/Input'
import Button from '../../components/Button'

import getValidationErrors from '../../utils/getValidationsErrors'
import api from '../../services/apiClient'

import logoImg from '../../assets/logo.svg'

import { Container, Content, AnimationContainer, Background } from './styles'

interface ResetPasswordFormData {
  password: string
  password_confirmation: string
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const history = useHistory()
  const location = useLocation()

  const handleResetPassword = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Confirmação incorreta.'),
        })

        await schema.validate(data, { abortEarly: false })

        const { password, password_confirmation } = data
        const token = location.search.replace('?token=', '')

        if (!token) {
          throw new Error()
        }

        await api.post('/password/reset', { password, password_confirmation, token })

        history.push('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha. Tente novamente',
        })
      }
    },
    [addToast, history, location.search]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleResetPassword}>
            <h1>Resetar senha</h1>

            <Input name="password" icon={FiLock} placeholder="Nova Senha" type="password" />
            <Input name="password_confirmation" icon={FiLock} placeholder="Confirmação da Senha" type="password" />
            <Button type="submit">Alterar Senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ResetPassword
