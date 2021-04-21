import mongoose from 'mongoose';




// An interface that describe the properties that are required to create a new User

interface ReportsAttrs {
 
  filename: string;
  file: Buffer;
 

}

interface ReportsModel extends mongoose.Model<ReportsDoc> {
    build(attrs : ReportsAttrs): ReportsDoc;
}

// An interface that describes the properties that a user document has

interface ReportsDoc extends mongoose.Document {
  
  filename: string;
  file: Buffer;
 

}


const ReportsSchema = new mongoose.Schema({
 

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