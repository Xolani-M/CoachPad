import { IDecodedToken } from "@/utils/auth/JwtHandler";
import { IUser, UserRole } from "@/providers/authProvider/context";

const isValidUserRole = (role: unknown): role is UserRole => {
  return typeof role === 'string' && ['admin', 'trainer', 'client'].includes(role);
};

export const mapDecodedTokenToUser = (decoded: IDecodedToken): IUser => {
  const safeRole: UserRole = isValidUserRole(decoded.role) ? decoded.role : 'client';

  return {
    id: decoded.id ?? 'unknown',
    name: decoded.name ?? 'Unknown User',
    email: decoded.email ?? 'unknown@example.com',
    role: safeRole,
    plan: null,
    features: Array.isArray(decoded.features) ? decoded.features : [],
    ...(safeRole === 'client'
      ? {
          trainerId: typeof decoded?.trainerId === 'string' ? decoded.trainerId : '',
          sex: typeof decoded?.sex === 'string' ? decoded.sex : '',
          fullName: decoded.name ?? 'N/A',
          dateOfBirth: typeof decoded?.dateOfBirth === 'string' ? decoded.dateOfBirth : '',
        }
      : {
          planType: typeof decoded?.planType === 'string' ? decoded.planType : 'basic',
          trial: Boolean(decoded?.trial),
          activeState: typeof decoded?.activeState === 'boolean' ? decoded.activeState : true,
        }),
  };
};
