import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserEntity {
  @Prop({ unique: true, required: true })
  email: string; // unique

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  photo?: string; // text

  @Prop({ required: false })
  refreshToken?: string;

  // @Prop()
  // createdAt: Date;
  //
  // @Prop()
  // updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
