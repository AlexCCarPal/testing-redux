import format from "date-fns/format";
import { sampleMemberships } from "./sampleMemberships";

export function createMembership(
  filters: { [key: string]: string } | null = null
) {
  return sampleMemberships;
}
export function deleteMembership(member: any) {
  return sampleMemberships;
}
export function updateMembership(memberId: number, member: any) {
  return sampleMemberships;
}
export function loadMemberships1(
  filters: { [key: string]: string } | null = null
) {
  return sampleMemberships;
}
export function loadMemberships(
  filters: { [key: string]: string } | null = null
) {
  const memberships = sampleMemberships.map((d) => {
    const data = d;

    return {
      ...data,
      originalExpirationDate: data?.expirationDate,
      originalCreatedAt: data?.created,
      originalUpdatedAt: data?.updated,
      expirationDate: data?.expirationDate
        ? format(new Date(data.expirationDate), "Pp")
        : null,
      created: data?.created ? format(new Date(data.created), "Pp") : null,
      updated: data?.updated ? format(new Date(data.updated), "Pp") : null,
    };
  });

  return memberships;
}
