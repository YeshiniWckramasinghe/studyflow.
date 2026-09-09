import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    notes: { type: String, trim: true, maxlength: 500, default: '' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString()
        ret.subjectId = ret.subjectId?.toString ? ret.subjectId.toString() : ret.subjectId
        ret.dueDate = ret.dueDate instanceof Date ? ret.dueDate.toISOString().slice(0, 10) : ret.dueDate
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  },
)

taskSchema.index({ subjectId: 1 })
taskSchema.index({ dueDate: 1 })

export default mongoose.model('Task', taskSchema)
