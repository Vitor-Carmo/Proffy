import { Request, Response} from 'express';
import database from '../database/connection';


export default class ConnectionsController{
    async index(req: Request, res: Response){
       const totalConnections =  await database('connections').count('* as total');

        const { total } =  totalConnections[0];


        return res.json({total})
    }
    
    
    async create(req: Request, res: Response){
        const { user_id } = req.body;


        await database('connections').insert({user_id});

        return res.status(201).send();
    }
}