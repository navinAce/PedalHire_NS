import mongoose ,{ Schema } from 'mongoose';

const feedbackSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    comments: [{
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now
      }
    }]
  },{
    timestamps: true
  });
  
 export const Feedback = mongoose.model('Feedback', feedbackSchema);