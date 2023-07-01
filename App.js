import { StyleSheet } from 'react-native';
import AddFirstEmployee from './Screens/AddFirstEmployee'
import { NativeRouter, Routes, Route } from 'react-router-native';
import Splash from './Screens/Splash';
import EmployeeRegistration from './Screens/EmployeeRegistration'
import EmployeeList from './Screens/EmployeeList'

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route path='/' Component={Splash}/>
        <Route path='/AddFirstEmployee' Component={AddFirstEmployee}/>
        <Route path='/EmployeeRegistration' Component={EmployeeRegistration}/>
        <Route path='/EmployeeList' Component={EmployeeList}/>
      </Routes>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
