import mongoose from 'mongoose';

// An interface that describe the properties that are required to create a new User

interface BodAttrs {
  member_code: string;
  account: number;
  security: string;
  volume: number;
  net_pending: number;
  available: number;
  investor_name: string;
  date: string;
}

interface BodModel extends mongoose.Model<BodDoc> {
  build(attrs: BodAttrs): BodDoc;
}

// An interface that describes the properties that a user document has

interface BodDoc extends mongoose.Document {
  member_code: string;
  account: number;
  security: string;
  volume: number;
  net_pending: number;
  available: number;
  investor_name: string;
  date: string;
}

const BodSchema = new mongoose.Schema(
  {
    member_code: {
      type: String,
      trim: true,
    },
    account: {
      type: Number,
      trim: true,
    },
    security: {
      type: String,
      trim: true,
    },
    volume: {
      type: Number,
      trim: true,
    },
    net_pending: {
      type: Number,
      trim: true,
    },
    available: {
      type: Number,
      trim: true,
    },
    investor_name: {
      type: String,
      trim: true,
    },

    date: {
      type: String,
      trim: true,
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

BodSchema.statics.build = (attrs: BodAttrs) => {
  return new Bod(attrs);
};

const Bod = mongoose.model<BodDoc, BodModel>('Bod', BodSchema);

export { Bod };
