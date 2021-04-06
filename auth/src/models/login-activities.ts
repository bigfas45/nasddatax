import mongoose from 'mongoose';

// An interface that describe the properties that are required to create a new User

interface LoginActivitiesAttrs {
  userId: string;
  date: Date;
  ip: string;
   broswer?: string;
}

interface LoginActivitiesModel extends mongoose.Model<LoginActivitiesDoc> {
  build(attrs: LoginActivitiesAttrs): LoginActivitiesDoc;
}

// An interface that describes the properties that a user document has

interface LoginActivitiesDoc extends mongoose.Document {
  userId: string;
  date: Date;
  broswer: string;
}

const LoginActivitiesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    ip: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
     broswer: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    date: {
       type: mongoose.Schema.Types.Date
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

LoginActivitiesSchema.statics.build = (attrs: LoginActivitiesAttrs) => {
  return new LoginActivities(attrs);
};

const LoginActivities = mongoose.model<
  LoginActivitiesDoc,
  LoginActivitiesModel
>('LoginActivities', LoginActivitiesSchema);

export { LoginActivities };
