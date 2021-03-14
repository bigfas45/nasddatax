import mongoose from 'mongoose';
import { Password } from '../services/password';
import {PremiumStatus} from '@nasddatax/common'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';


// An interface that describe the properties that are required to create a new User

interface EmailAttrs {
  subject: string;
  link: string;
  message: string;
  file: Buffer;
 

}

interface EmailModel extends mongoose.Model<EmailDoc> {
    build(attrs : EmailAttrs): EmailDoc;
}

// An interface that describes the properties that a user document has

interface EmailDoc extends mongoose.Document {
   subject: string;
  link: string;
  message: string;
  file: Buffer;
 

}


const emailSchema = new mongoose.Schema({
  subject: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },

    link: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    message: {
      type: String,
      required: true,
    },

    file: {
      data: Buffer,
      contentType: String,
      path: String,
      name: String,
  },
    
},  {
  toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});




emailSchema.statics.build = (attrs: EmailAttrs) => {
  return new Email(attrs);
}

const Email = mongoose.model<EmailDoc, EmailModel>('Email', emailSchema);



export { Email  };