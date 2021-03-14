import mongoose from 'mongoose';




// An interface that describe the properties that are required to create a new User

interface ReportsAttrs {
  security: string;
  year: string;
  filename: string;
  file: Buffer;
 

}

interface ReportsModel extends mongoose.Model<ReportsDoc> {
    build(attrs : ReportsAttrs): ReportsDoc;
}

// An interface that describes the properties that a user document has

interface ReportsDoc extends mongoose.Document {
   security: string;
  year: string;
  filename: string;
  file: Buffer;
 

}


const ReportsSchema = new mongoose.Schema({
  security: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },

    year: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    filename: {
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




ReportsSchema.statics.build = (attrs: ReportsAttrs) => {
  return new Reports(attrs);
}

const Reports = mongoose.model<ReportsDoc, ReportsModel>('Reports', ReportsSchema);



export { Reports  };