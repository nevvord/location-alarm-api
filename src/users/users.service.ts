import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser = await new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(id: string, data: Partial<UserEntity>) {
    return await this.userModel.updateOne({ _id: id }, data);
  }
}
