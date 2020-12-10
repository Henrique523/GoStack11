import styled from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px 100px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`

export const ForgotPasswordText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #f4ede8;
  font-size: 16px;
`

export const CreateAccountButton = styled.TouchableOpacity`
  width: 100%;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const CreateAccountButtonText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #ff9000;
  font-size: 18px;
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`
