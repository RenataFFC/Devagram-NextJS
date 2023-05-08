import multer from "multer";
import cosmicjs from 'cosmicjs';


const{
CHAVE_DE_GRAVACAO_AVATARES=
CHAVE_DE_GRAVACAO_PUBLICACOES=
BUCKET_AVATARES=
BUCKET_PUBLICACOES=
} = process.env;

const Cosmisc = cosmicjs();
const bucketAvatares = 
