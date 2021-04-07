import mongoose from 'mongoose';

// An interface that describe the properties that are required to create a new User

interface UserAttrs {
  name: string;
  dob: string;
  telephone: number;
  email: string;
  gender: string;
  certificate: string;
  expiresAt: Date;
  IELTS: string;
  Nurse: string;
  NMC: string;
  CBT: string;
  discipline: string;
  experience: string;
  workingNurse: string;
  department: string;
  relation: string;
  notice: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a user document has

interface UserDoc extends mongoose.Document {
  name: string;
  dob: string;
  telephone: number;
  email: string;
  gender: string;
  certificate: string;
  expiresAt: Date;
  IELTS: string;
  Nurse: string;
  NMC: string;
  CBT: string;
  discipline: string;
  experience: string;
  workingNurse: string;
  department: string;
  relation: string;
  notice: string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
 
    dob: {
      type: String,
    },
    telephone: {
      type: Number,
    },
    email: {
      type: String,
       unique: true,
    },
    gender: {
      type: String,
    },
    certificate: {
      type: String,
    },
    IELTS: {
      type: String,
    },
    Nurse: {
      type: String,
    },
    NMC: {
      type: String,
    },
    CBT: {
      type: String,
    },
    discipline: {
      type: String,
    },
    experience: {
      type: String,
    },
    workingNurse: {
      type: String,
    },
    department: {
      type: String,
    },
    relation: {
      type: String,
    },
    notice: {
      type: String,
    },

    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
