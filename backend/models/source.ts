import { Schema, model } from "mongoose"

export interface Source {
  url: string,
  selector: {
    valuesParentSelector: string,
    buySelector: string,
    sellSelector: string
  },
  active: boolean
}

const SourceSchema = new Schema<Source>({
  url: {
    type: String,
    required: true
  },
  selector: {
    valuesParentSelector: {
      type: String,
      required: true
    },
    buySelector: {
      type: String,
      required: true
    },
    sellSelector: {
      type: String,
      required: true
    }
  },
  active: {
    type: Boolean,
    default: true
  }
})

export default model<Source>("Source", SourceSchema)