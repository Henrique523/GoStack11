import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Dashboard from '../pages/Dashboard'

const AppRoutes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  )
}

export default AppRoutes
