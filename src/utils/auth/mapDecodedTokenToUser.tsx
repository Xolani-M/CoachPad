import { IDecodedToken } from "@/utils/auth/JwtHandler";
import { IUser } from "@/providers/authProvider/context";

export const mapDecodedTokenToUser = (decoded: IDecodedToken): IUser => {
  return {
    id: decoded.id || "unknown",
    name: decoded.name || "Unknown User",
    email: decoded.email || "unknown@example.com",
    role: (decoded.role as "admin" | "user") || "user",
    contactNumber: "", // not in token
    plan: null,
    features: [],
    ...(decoded.role === "user"
      ? { trainerId: "", sex: "", dateOfBirth: "" }
      : { planType: "basic", trial: false, activeState: true }),
  };
};
