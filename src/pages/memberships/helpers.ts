import { isNil, isEmpty } from "ramda";
import isAfter from "date-fns/isAfter";

export const isNullOrEmpty = (value: string) => isNil(value) || isEmpty(value);

export const Category: any = {
  STANDARD: "Standard",
  GOLD: "Gold",
  PREMIUM: "Premium",
};

export type CategoryType = typeof Category;

export const validateEmail = (email: string | undefined): boolean => {
  return typeof email === "undefined"
    ? false
    : email!.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email!);
};

export const validatePhone = (phone: string | undefined): boolean => {
  return typeof phone === "undefined"
    ? false
    : phone!.length > 0 && /^\+(?:\d{10}|\d{11})$/.test(phone!);
};

export const validateCategory = (category: string | undefined): boolean => {
  return !isNullOrEmpty(category!);
};

export const validateName = (name: string | undefined): boolean => {
  return typeof name === "undefined"
    ? false
    : /^[A-Z][a-z]+(\s[A-Z][a-z]+)?$/.test(name!);
};

export const validateFields = (fields: {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  category: string | undefined;
}): boolean => {
  return (
    validateEmail(fields.email) &&
    validatePhone(fields.phone) &&
    validateCategory(fields.category) &&
    validateName(fields.name)
  );
};
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
