import styled, { css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

interface InputProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.View<Omit<InputProps, 'isFilled'>>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  border: 2px solid #232129;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}


  flex-direction: row;
  align-items: center;
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`

export const Icon = styled(FeatherIcon)<InputProps>`
  margin-right: 16px;

  ${props =>
    props.isErrored &&
    css`
      color: #c53030;
    `}

  ${props =>
    (props.isFocused || props.isFilled) &&
    css`
      color: #ff9000;
    `}
`
