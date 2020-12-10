import React from 'react'
import { Button, View } from 'react-native'

import { useAuth } from '../../hooks/Auth'

import { Container, Title } from './styles'

const Dashboard: React.FC = () => {
  const { signOut } = useAuth()
  return (
    <Container>
      <Title>Dashboard</Title>
      <View style={{ marginTop: 24 }}>
        <Button title="Fazer Logout" onPress={signOut} />
      </View>
    </Container>
  )
}

export default Dashboard
