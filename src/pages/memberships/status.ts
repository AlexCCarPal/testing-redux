import isAfter from "date-fns/isAfter";

export enum MembershipStatus {
  REQUESTED = "solicitada",
  EXPIRED = "expirada",
  ACTIVE = "activa",
}

export const getMembershipStatus = (membership: any) => {
  if (!membership.expirationDate) {
    return MembershipStatus.REQUESTED;
  }
  if (isAfter(new Date(), new Date(membership.expirationDate))) {
    return MembershipStatus.EXPIRED;
  }

  return MembershipStatus.ACTIVE;
};
