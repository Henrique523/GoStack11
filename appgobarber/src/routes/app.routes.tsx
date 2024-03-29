import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Dashboard from '../pages/Dashboard'
import CreateAppointment from '../pages/CreateAppointment'
import AppointmentCreated from '../pages/AppointmentCreated'
import Profile from '../pages/Profile'

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
      <Screen name="CreateAppointment" component={CreateAppointment} />
      <Screen name="AppointmentCreated" component={AppointmentCreated} />

      <Screen name="Profile" component={Profile} />
    </Navigator>
  )
}

export default AppRoutes
