import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  padding: 0 30px ${Platform.OS === 'ios' ? 100 : 150}px;
`

export const BackButton = styled.TouchableOpacity`
  margin-top: 200px;
`

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #fff;
  margin: 24px 0 24px;
  align-self: flex-start;
`

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`

export const UserAvatar = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  align-self: center;
`
