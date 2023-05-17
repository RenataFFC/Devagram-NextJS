import mongoose, {Schema} from "mongoose";

const SeguidorSchema = new Schema({
  // quem segue
  usuarioId: {type: String, require: true},
//quem está sendo seguido
  usuarioSeguidoId :{ type: String, require: true},
});

export const SeguidorModel = (mongoose.models.seguidores ||
    mongoose.model('seguidores', SeguidorSchema));

