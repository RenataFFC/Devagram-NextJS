import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
 // eslint-disable-next-line import/no-anonymous-default-export


const endpointLogin = (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>
) => {

 if(req.method === 'POST'){
  const{login,senha} = req.body;
    
    if(login === 'admin@admin.com' && senha === 'Admin@123'){
          return  res.status(200).json({msg:'Usuario autenticado com sucesso!'});
    }
    return  res.status(400).json({erro:'Usuario e senha nao encontrado!'});

}
  return res.status(405).json({erro:'Metodo informado não é válido!'});

}

export default conectarMongoDB(endpointLogin);


