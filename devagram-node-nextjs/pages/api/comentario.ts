import type {NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import { upload,uploadImagemCosmic } from "../../SERVICES/uploadImagemCosmicjs";
import nc from "next-connect";
import {conectarMongoDB} from '../../middlewares/conectarMongoDB';
import{validarTokenJWT} from '../../middlewares/validarTokenJWT';
import {PublicacaoModel} from '../../models/PublicacaoModel';
import {UsuarioModel} from '../../models/UsuarioModel';
import moment from "moment";
import { visitFunctionBody } from "typescript";
import usuario from "./usuario";

const comentarioEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>)=>{
    try {
     
       if(req.method === 'PUT'){
        const{userId, id} = req.query;
        const usurioLogado = await UsuarioModel.findById(userId);
        if(!usuarioLogado){
          return res.status(400).json({erro:'Usuario não encontrado'})
        }

        const(!req.body || req.body.comentario || req.body.comentario.length <2){
          return res.status(400).json({erro:'Comentario nao é valido'});
        }

       }
       return res.status(405).json({erro:'Metodo informado não é valido'})

    } catch (e){
    console.log(e);
    return res.status(500).json({erro:'Ocorreu erro ao adicionar comentarios'})
    } 
}

export default validarTokenJWT(conectarMongoDB(comentarioEndpoint));