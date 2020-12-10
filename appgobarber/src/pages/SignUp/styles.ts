import { Platform } from 'react-native'
import styled from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: 0 30px ${Platform.OS === 'ios' ? 100 : 150}px;
`

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #fff;
  margin: 64px 0 24px;
`

export const BackToLoginScreen = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  border-top-width: 1px;
  border-color: #232129;
  width: 100%;
`

export const BackToLoginScreenText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #fff;
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`
