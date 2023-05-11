import type { NextApiRequest , NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import {validarTokenJWT} from '../../middlewares/validarTokenJWT';
import {conectarMongoDB} from '../../middlewares/conectarMongoDB';

const feedEndPoint = ( req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>)=>{


try{


}catch(e){
  console.log(e)
  res.status(400).json({erro:'nao foi possivel obter o feed'})


}
}