import { Schema, model } from "mongoose";
import handleSchemaValidationErrors from "../helpers/errors/handleSchemaValidationErrors.js";

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  token: { type: String, require: true },
});

TokenSchema.post("save", handleSchemaValidationErrors);


export const TokensModel = model("token", TokenSchema);

export default TokenSchema;