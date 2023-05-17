import type { NextApiRequest , NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import {validarTokenJWT} from '../../middlewares/validarTokenJWT';
import {conectarMongoDB} from '../../middlewares/conectarMongoDB';
import {UsuarioModel} from '../../models/UsuarioModel';
import {PublicacaoModel} from '../../models/PublicacaoModel';
import { SeguidorModel } from '../../models/SeguidorModels';

const feedEndPoint = async ( req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any>) => {
try{
   if(req.method === 'GET'){        
         if(req?.query?.id){
console.log('cheguei aqui')
            const usuario = await UsuarioModel.findById(req?.query?.id);
             if(!usuario){
                 return res.status(400).json({erro:'Usuario não encontrado'});
             }

           const publicacoes = await PublicacaoModel.find({idUsuario : usuario._id})
           .sort({data: -1});

            return res.status(200).json(publicacoes);
        }else{
          const {userId} = req.query;
          const usuarioLogado = await UsuarioModel.findById(userId);
          if(!usuarioLogado){
            return res.status(400).json({erro:'Usuario nao encontrado'});
             console.log('publicacoes');

          }
          const seguidores = await SeguidorModel.find({usuarioId: usuarioLogado._id});
          const seguidoresIds = seguidores.map(s=>s.usuarioSeguidoId);

          const publicacoes = await PublicacaoModel.find({
            $or:[
              { idUsuario: usuarioLogado._id},
              {idUsuario: seguidoresIds}
            ]
          })
          .sort({data: -1});
       return res.status(200).json(publicacoes);
       console.log(publicacoes);
         } 
      }
      
      console.log('publicacoes');
      return res.status(405).json({erro:'Método informado não é válido'}) ; 
    }catch(e){
      console.log(e);
         }
         return res.status(400).json({erro:'nao foi possivel obter o feed'});
  
        }


export default validarTokenJWT(conectarMongoDB(feedEndPoint));