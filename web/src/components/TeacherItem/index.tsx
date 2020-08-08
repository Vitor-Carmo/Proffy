import React from 'react';
import Whatsapp from '../../assets/images/icons/whatsapp.svg'


import './styles.css'
import api from '../../services/api';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}


interface TeacherItemsProps {
    teacher: Teacher;
}




const TeacherItem: React.FC<TeacherItemsProps> = ({ teacher }) => {
    
    function createNewConnection(){
        api.post('/connections', {
            user_id: teacher.id
        });
    }


    return (
       
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={ teacher.name } />
                <div>
                    <strong>{teacher.name} </strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>


            <p>{ teacher.bio }</p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ { teacher.cost }</strong>
                </p>

                <a 
                target="_blank"
                onClick={ createNewConnection } 
                href={ `https://wa.me/${teacher.whatsapp}?text=Olá, ${teacher.name}! Tudo bom? Eu gostaria de marcar uma aula com você, que tal negociarmos isso?` }>
                    <img src={Whatsapp} alt="Whatsapp" />
                            Entrar em contato
                </a>
            </footer>

        </article>

    );
}


export default TeacherItem;