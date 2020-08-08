import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';







function Favorites(){

    const [favorites, setFavorites] = useState([]);

    function loadFavorites() {
        // favorites: o nome quq eu dei para 'database'
        AsyncStorage.getItem('favorites').then(res => {
            // a resposta vem como testo , logo se vc quiser 
            // um array, vc tera que passar para o formato JSON
    
            if (res) {
                const favoritedTeachers = JSON.parse(res);
    
                setFavorites(favoritedTeachers);
            }
        });
    }
    
    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
      )
    

    return(
        <View style={ styles.container }>
            <PageHeader title="Meus proffys favoritos"/>

            <ScrollView
                style={ styles.teacherList }
                contentContainerStyle={{
                    paddingHorizontal:16,
                    paddingBottom: 16,
                }}
            >

            { 
                favorites.map((teacher : Teacher)=>{
                    return (
                        <TeacherItem
                            key={ teacher.id }
                            teacher ={ teacher}
                            favorited
                        />
                    );
                })
            }    
              
            </ScrollView>
        </View>
    );
}

export default Favorites;