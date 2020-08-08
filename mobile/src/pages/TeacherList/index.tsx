import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, AsyncStorage } from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';



import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';




function TeacherList() {

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [teachers, setTeachers] = useState([]);



    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');



    const [favorites, setFavorites] = useState<number[]>([]);

    function loadFavorites() {
        // favorites: o nome quq eu dei para 'database'
        AsyncStorage.getItem('favorites').then(res => {
            // a resposta vem como testo , logo se vc quiser 
            // um array, vc tera que passar para o formato JSON

            if (res) {
                const favoritedTeachers = JSON.parse(res);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });


                setFavorites(favoritedTeachersIds);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
      )
    

    async function handleFiltersSubmit() {
        loadFavorites();
        const response = await api.get('/classes', {
            //para enviar os parametros
            params: {
                subject,
                week_day,
                time
            }
        });

        setIsFiltersVisible(false);
        setTeachers(response.data);
    }


    // mostra/tira o formulario quando clica 
    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }




    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}>

                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>

                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => { setSubject(text) }}
                            placeholder="Qual é a matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>

                                <TextInput
                                    value={week_day}
                                    onChangeText={text => { setWeek_day(text) }}
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>

                                <TextInput
                                    value={time}
                                    onChangeText={text => { setTime(text) }}
                                    style={styles.input}
                                    placeholder="Qual o horário?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >

                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}


            </ScrollView>

        </View>
    );
}

export default TeacherList;