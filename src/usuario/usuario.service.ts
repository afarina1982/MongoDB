import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from 'src/odm/schema/usuario.schema';
import { UsuarioMapper } from './mapper/usuario.mapper';
import { GetUsuarioDto } from './dto/get-usuario.dto';

@Injectable()
export class UsuarioService {

constructor(
  @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>
) {}


  async create(createUsuarioDto: CreateUsuarioDto): Promise<GetUsuarioDto> {
    const usuario : Usuario = UsuarioMapper.dtoToSchema(createUsuarioDto);
    const usuarioGuardado : Usuario = await this.usuarioModel.create(usuario);
    console.log(usuarioGuardado);
    return UsuarioMapper.schemaToDto(usuarioGuardado);
  }
 
 async findAll(): Promise<Usuario[]> {
  // const resultado =
  // console.log(resultado);
  //console.log(await this.usuarioModel.find().exec());
  return [];
 }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
