import React, { useRef, useCallback } from 'react'
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import api from '../../services/api'

import Input from '../../components/Input'
import Button from '../../components/Button'

import getValidationErrors from '../../utils/getValidationsErrors'

import logoImg from '../../assets/logo.png'

import { Container, Title, BackToLoginScreen, BackToLoginScreenText, Icon } from './styles'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const { navigate } = useNavigation()
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const formRef = useRef<FormHandles>(null)

  const handleCreateNewAccount = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string().required('E-mail obrigatório').email('Inserir e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        })

        await schema.validate(data, { abortEarly: false })

        await api.post('/users', data)

        Alert.alert('Cadastro realizado com sucesso!', 'Você já pode fazer login na aplicação.')

        navigate('SignIn')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }

        Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer cadastro. Cheque os dados e tente novamente')
      }
    },
    [navigate]
  )

  return (
    <>
      <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleCreateNewAccount}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
              />
              <Input
                ref={emailRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              <Input
                ref={passwordRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <View>
                <Button onPress={() => formRef.current?.submitForm()}>Cadastrar</Button>
              </View>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLoginScreen onPress={() => navigate('SignIn')}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToLoginScreenText>Voltar para Login</BackToLoginScreenText>
      </BackToLoginScreen>
    </>
  )
}

export default SignUp
