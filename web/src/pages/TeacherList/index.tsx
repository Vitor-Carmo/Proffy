import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem,  { Teacher } from '../../components/TeacherItem';

import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css'
import api from '../../services/api';


function TeacherList() {


    // lista de professores
    const [teachers, setTeachers] = useState([]);



    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');



    async function searchTeachers(e: FormEvent){
        e.preventDefault(); // não regarregar a página


        const response = await api.get('/classes', {
            //para enviar os parametros
            params:{
                subject,
                week_day,
                time
            }
        });


       setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>

                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => {
                            setSubject(e.target.value)
                        }}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Educação Física', label: 'Educação Física' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Quimíca', label: 'Quimíca' },
                            { value: 'Português', label: 'Português' },
                            { value: 'História', label: 'História' },
                            { value: 'Geográfia', label: 'Geográfia' },
                            { value: 'Inglês', label: 'Inglês' },
                            { value: 'Filosofia', label: 'Filosofia' },
                            { value: 'Sociologia', label: 'Sociologia' },

                        ]}
                    />

                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => {
                            setWeek_day(e.target.value)
                        }}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sabádo' },
                        ]}
                    />

                    <Input 
                    type="time" 
                    name="time" 
                    label="Hora" 
                    value={ time }
                    onChange = { (e) =>{
                        setTime(e.target.value)
                    }}/>


                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>
            <main>


                { teachers.map( (teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={ teacher } />
                }) }
                
               

            </main>
        </div>
    );
}


export default TeacherList;