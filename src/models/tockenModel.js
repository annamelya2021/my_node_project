import { Schema, model } from "mongoose";
import handleSchemaValidationErrors from "../helpers/error/handleSchemaValidationErrors.js";

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, require: true },
});

TokenSchema.post("save", handleSchemaValidationErrors);

export const Tokens = model("token", TokenSchema);

export default TokenSchema;