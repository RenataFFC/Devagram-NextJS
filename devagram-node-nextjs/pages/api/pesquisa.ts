import type { NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';
import { UsuarioModel } from '../../models/UsuarioModel';
import { politicaCORS } from '@/middlewares/politicaCORS';

const pesquisaEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any[]>)=>{

try {
    if(req.method === 'GET'){
       if(req?.query?.id){

    const usuarioEncontrado = await UsuarioModel.findById(req?.query?.id);
    if(!usuarioEncontrado){
       return res.status(400).json({erro: 'Usuario nao encotrado'})
    }
usuarioEncontrado.senha=null;
 return res.status(200).json(usuarioEncontrado);


}else{
   const {filtro} = req.query;
    if(filtro && filtro.length <2){
        return res.status(400).json({erro: 'Favor informar pelo menos 2 caracter para a busca'})
   }
    const usuariosEncontrados = await UsuarioModel.find({
    $or: [{ nome: { $regex: filtro, $options: 'i' } },
    { email : {$regex : filtro, $options: 'i'}}
    ]
});
  return  res.status(200).json(usuariosEncontrados);
}
    return res.status(405).json({erro: 'Metodo informado não é valido'})


}
     
} catch(e) {
    console.log(e);
    return res.status(500).json({erro: 'Não foi possivel buscar usuario' + e })
}
}

export default politicaCORS( validarTokenJWT(conectarMongoDB(pesquisaEndpoint)));