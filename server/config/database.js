import mongoose from 'mongoose';

export const connectDb = async () => {
  await mongoose.connect(
    'mongodb+srv://Mazhil:Ragnar@mernapp.euvmm6b.mongodb.net/OnlineShopping'
  );
};
