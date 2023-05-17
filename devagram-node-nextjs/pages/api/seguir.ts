import type { NextApiRequest , NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import {validarTokenJWT} from '../../middlewares/validarTokenJWT';
import {conectarMongoDB} from '../../middlewares/conectarMongoDB';
import { UsuarioModel } from '../../models/UsuarioModel';
import { SeguidorModel } from '../../models/SeguidorModels';

const endpointSeguir = 
async ( req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>)=>{
 
 try {
    if(req.method === 'PUT'){
    const{userId, id} = req?.query;


    const usuarioLogado = await  UsuarioModel.findById(userId);
    if(!usuarioLogado){
      return res.status(400).json({erro: 'Usuario logado não encontrado'});
    }


   const usuarioASerSeguido = await  UsuarioModel.findById(id);
   if(!usuarioASerSeguido){
   return res.status(400).json({erro: 'Usuario a ser seguido  não encontrado'});
   }


 const euJaSigoEsseUsuario = await  SeguidorModel.find({usuarioId: usuarioLogado._id, usuarioSeguidoId: usuarioASerSeguido._id});
   if(euJaSigoEsseUsuario && euJaSigoEsseUsuario.length >0){

   euJaSigoEsseUsuario.forEach(async(e: any) =>  await SeguidorModel.findByIdAndDelete({_id: e._id}));
   
 usuarioLogado.seguindo--;
 await UsuarioModel.findByIdAndUpdate({_id: usuarioLogado._id}, usuarioLogado);
 usuarioASerSeguido.seguidores--;
 await UsuarioModel.findByIdAndUpdate({_id: usuarioASerSeguido._id}, usuarioASerSeguido);
 
 return res.status(200).json({msg: 'Deixou de seguir o Usuario com sucesso'});


}else{
  const seguidor={
    usuarioId: usuarioLogado._id,
    usuarioSeguidoId: usuarioASerSeguido._id
  }; 
    await SeguidorModel.create(seguidor);

    usuarioLogado.seguindo++;
    await UsuarioModel.findByIdAndUpdate({_id: usuarioLogado._id}, usuarioLogado);

   usuarioASerSeguido.seguidores++;
  await UsuarioModel.findByIdAndUpdate({_id: usuarioASerSeguido._id}, usuarioASerSeguido);


    return res.status(200).json({msg: 'Usuario seguido  com sucesso'});

}
}
  
   return res.status(405).json({erro: 'Metodo não encontrado'})
    
 }catch(e) {
 console.log(e);
     return res.status(500).json({erro:'Não foi possivel seguir/deseguir o usuario informado'})
 }
}

export default validarTokenJWT(conectarMongoDB(endpointSeguir));