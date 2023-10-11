import bcrypt from 'bcryptjs';
import { DocumentType, getModelForClass, pre, prop, PropType } from "@typegoose/typegoose";

@pre<UserClass>('save', async function (next) {
  try {
    // Check method of registration
    const user = this;
    if (!user.isModified('password')) {
      next();
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace plain text password with hashed password
    this.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
})

class UserClass {
  @prop({ type: () => String, required: true })
  public username: string;

  @prop({ type: () => String, required: true })
  public password: string;

  @prop({ type: () => [String], required: false }, PropType.ARRAY)
  public likes?: string[];

  @prop({ type: () => [String], required: false }, PropType.ARRAY)
  public dislikes?: string[];

  @prop({ type: () => [String], required: false }, PropType.ARRAY)
  public flavourProfile?: string[];

  @prop({ type: () => [String], required: false }, PropType.ARRAY)
  public allergens?: string[];

  public async matchPassword(this: DocumentType<UserClass>, password: string) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error(error);
    }
  }

}

export const UserModel = getModelForClass(UserClass);
