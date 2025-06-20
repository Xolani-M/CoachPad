import { IDecodedToken } from "@/utils/auth/JwtHandler";
import { IUser, UserRole } from "@/providers/authProvider/context";

const isValidUserRole = (role: unknown): role is UserRole => {
  return typeof role === 'string' && ['admin', 'trainer', 'client'].includes(role);
};

export const mapDecodedTokenToUser = (decoded: IDecodedToken): IUser => {
  const safeRole: UserRole = isValidUserRole(decoded.role) ? decoded.role : 'client';

  return {
    id: decoded.id ?? decoded._id ?? decoded.sub ?? 'unknown',
    name: decoded.name || 'Unknown User',
    email: typeof decoded.email === 'string' && decoded.email !== '' ? decoded.email : 'unknown@example.com',
    role: safeRole,
    plan: null,
    features: Array.isArray(decoded.features) ? decoded.features : [],
    ...(safeRole === 'client'
      ? {
          trainerId: decoded.trainerId as string ?? '',
          sex: decoded.sex as string ?? '',
          fullName: decoded.name ?? 'N/A',
          dateOfBirth: decoded.dateOfBirth as string ?? '',
        }
      : {
          planType: decoded.planType as string ?? 'basic',
          trial: !!decoded.trial,
          activeState: decoded.activeState as boolean ?? true,
        }),
  };
};
