import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { AppLoading } from 'expo'; // para fonts externas


// Não se pode deixar dois componentes soltos no return 
// então você coloca em volta deles um <></>, que é conhecido como fragment

import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppStack from './src/routes/AppStack';



export default function App() {

  


  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
  });


  // só vai carregar a tela assim que as fontes estiverem carrregadas
  if (!fontsLoaded) {

    return <AppLoading />;


  } else {
    return (
      <>
        <AppStack/>

        <StatusBar style="light" />
      </>
    );

  }
}

//--- usar fonte no react ---// 
//expo install expo-font @expo-google-fonts/archivo @expo-google-fonts/poppins

//----- Navegação (react navigation)-----//
//yarn add @react-navigation/native
//yarn add @react-navigation/stack
// yarn add @react-navigation/bottom-tabs