import crypto from "crypto";

export function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

export function hashOTP(code) {
  return crypto
    .createHash("sha256")
    .update(code)
    .digest("hex");
}