import React, { useRef, useCallback } from 'react'
import { View, ScrollView, TextInput, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker'

import api from '../../services/api'
import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErrors from '../../utils/getValidationsErrors'
import { useAuth } from '../../hooks/Auth'

import { Container, Title, UserAvatarButton, UserAvatar, BackButton } from './styles'

interface ProfileFormData {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth()

  const { goBack } = useNavigation()
  const formRef = useRef<FormHandles>(null)

  const emailRef = useRef<TextInput>(null)
  const oldPasswordRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)

  const handleCreateNewAccount = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string().required('E-mail obrigatório').email('Inserir e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Campo obrigatório.'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Campo obrigatório.'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
        })

        await schema.validate(data, { abortEarly: false })

        const { email, name, old_password, password, password_confirmation } = data

        const formData = Object.assign(
          {
            name,
            email,
          },
          data.old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}
        )

        const response = await api.put('/profile', formData)
        updateUser(response.data)

        Alert.alert('Perfil atualizado com sucesso!')

        goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil. Cheque os dados e tente novamente'
        )
      }
    },
    [goBack, updateUser]
  )

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      response => {
        if (response.didCancel) {
          return
        }
        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar.')
          return
        }

        const data = new FormData()

        data.append('avatar', {
          uri: response.uri,
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
        })

        api.patch('/users/avatar', data).then(apiResponse => {
          updateUser(apiResponse.data)
        })
      }
    )
  }, [updateUser, user.id])

  const handleGoBack = useCallback(() => {
    goBack()
  }, [goBack])

  return (
    <>
      <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <Container>
          <BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>
          <UserAvatarButton onPress={handleUpdateAvatar}>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </UserAvatarButton>
          <View>
            <Title>Meu perfil</Title>
          </View>

          <Form initialData={user} ref={formRef} onSubmit={handleCreateNewAccount}>
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
              onSubmitEditing={() => oldPasswordRef.current?.focus()}
            />
            <Input
              ref={oldPasswordRef}
              name="old_password"
              icon="lock"
              placeholder="Senha atual"
              secureTextEntry
              returnKeyType="next"
              containerStyle={{ marginTop: 16 }}
              textContentType="password"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <Input
              ref={passwordRef}
              name="password"
              icon="lock"
              placeholder="Nova senha"
              secureTextEntry
              returnKeyType="next"
              textContentType="newPassword"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
            <Input
              ref={confirmPasswordRef}
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar senha"
              secureTextEntry
              returnKeyType="send"
              textContentType="newPassword"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <View>
              <Button onPress={() => formRef.current?.submitForm()}>Confirmar mudanças</Button>
            </View>
          </Form>
        </Container>
      </ScrollView>
    </>
  )
}

export default Profile
