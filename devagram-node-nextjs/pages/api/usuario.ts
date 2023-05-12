import type { NextApiRequest , NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import {validarTokenJWT} from '../../middlewares/validarTokenJWT';
import {conectarMongoDB} from '../../middlewares/conectarMongoDB';
import {UsuarioModel} from '../../models/UsuarioModel';
import { upload,uploadImagemCosmic } from "../../SERVICES/uploadImagemCosmicjs";
import nc from "next-connect";


const handler = nc()
.use(upload.single('file'))
.put(async(req:any, res:NextApiResponse<RespostaPadraoMsg>)=> {
try{
    const {userId} = req?.query;
    const usuario = await UsuarioModel.findById(userId);
if(!usuario){
  return res.status(400).json({erro: 'Usuario nao encontrado'});  
}

const {nome} = req.body;
if(nome || nome.length <2) {
       usuario.nome = nome;
}

const {file} = req;
if(file && file.originalname) {
     const image = await uploadImagemCosmic(req);
       if( file && image.media && image.media.url){
              usuario.avatar = image.media.url;
        }
}

await UsuarioModel.findByIdAndUpdate({_id: usuario._id}, usuario);

return res.status(200).json({msg:'usuario alterado com sucesso'})

}catch(e){
    console.log(e);      
    return res.status(400).json({erro: 'Não foi possivel atualizar usuario' + e});  
    }   
})

.get( async (req: NextApiRequest, res : NextApiResponse<RespostaPadraoMsg | any>)=> {  
try{
    const {userId} = req?.query;
    const usuario = await UsuarioModel.findById(userId);
    usuario.senha = null
    return res.status(200).json(usuario);
    }catch(e) {
    console.log(e);
          }
return res.status(400).json({erro: 'Não foi possivel obter dados do usuario'});    

});

export const config = {
api:{
   bodyParser:false
}
}

 export default validarTokenJWT(conectarMongoDB(handler));
