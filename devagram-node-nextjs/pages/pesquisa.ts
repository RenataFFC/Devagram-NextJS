import type { NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../types/RespostaPadraoMsg';
import { conectarMongoDB } from '@/middlewares/conectarMongoDB';
import { validarTokenJWT } from '@/middlewares/validarTokenJWT';

const pesquisaEndpoint = (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>)=>{


try {
    
} catch (e) {
    console.log(e);
    return res.status(500).json({erro: 'Não foi possivel buscar usuario'})
}
}

export default validarTokenJWT( conectarMongoDB( pesquisaEndpoint));