import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IMeal extends Document {
  name: string;
  description: string;
  calories: number;
  dateTime: Date;
  type: 'Café da manhã' | 'Almoço' | 'Lanche da tarde' | 'Janta';
}

const MealSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  calories: { type: Number, required: true },
  dateTime: { type: Date, required: true },
  type: { type: String, enum: ['Café da manhã', 'Almoço', 'Lanche da tarde', 'Janta'], required: true },
});

export default models.Meal || model<IMeal>('Meal', MealSchema);
