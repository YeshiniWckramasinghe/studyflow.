import mongoose from 'mongoose'

const COLOR_KEYS = ['moss', 'amber', 'coral', 'plum', 'teal', 'slate']

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    instructor: { type: String, trim: true, maxlength: 80, default: '' },
    color: { type: String, enum: COLOR_KEYS, default: 'moss' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  },
)

export const COLOR_ENUM = COLOR_KEYS
export default mongoose.model('Subject', subjectSchema)
