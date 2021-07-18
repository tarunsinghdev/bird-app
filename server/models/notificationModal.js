import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    userTo: { type: Schema.Types.ObjectId, ref: 'User' },
    notificationType: { type: String },
    opened: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
