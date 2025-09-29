
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserEntity } from '../../../domain/users/user.entity';
import { UserRepositoryPort } from '../../../domain/users/user.repository.port';
import { User, UserDocument } from './user.schema';

@Injectable()
export class MongooseUserRepository implements UserRepositoryPort {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const createdUser = new this.userModel(user);
    const saved = await createdUser.save();
    return new UserEntity(saved.id, saved.email, saved.name, saved.password_hash, saved.roleId);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return null;
    }
    return new UserEntity(user.id, user.email, user.name, user.password_hash, user.roleId);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => new UserEntity(user.id, user.email, user.name, user.password_hash, user.roleId));
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.userModel.countDocuments({ email }).exec();
    return count > 0;
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.userModel.countDocuments({ _id: id }).exec();
    return count > 0;
  }

  async deleteById(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const updated = await this.userModel.findByIdAndUpdate(
      user.id,
      {
        name: user.name,
        password_hash: user.password_hash,
        roleId: user.roleId,
      },
      { new: true },
    ).exec();

    if (!updated) {
      throw new Error('User not found');
    }

    return new UserEntity(updated.id, updated.email, updated.name, updated.password_hash, updated.roleId);
  }
}
