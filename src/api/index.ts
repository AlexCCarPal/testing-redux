import {
  getDocs,
  collection,
  query,
  where,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { firestoreDb } from "../firebase";

import { isNil, isEmpty, omit } from "ramda";
import { MembershipStatus } from "../pages/memberships/status";

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

export function loadMembershipsStatic(
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

export async function loadMemberships(
  filters: { [key: string]: string } | null = null
) {
  const queryConditions = buildQuery(filters);

  const membershipsQuery = query(
    collection(firestoreDb, "memberships"),
    ...queryConditions
  );

  const reqResult = await getDocs(membershipsQuery);

  const memberships = reqResult.docs.map((d) => {
    const data = d.data();

    return {
      ...data,
      originalExpirationDate: data?.expirationDate,
      originalCreatedAt: data?.created,
      originalUpdatedAt: data?.updated,
      expirationDate: data?.expirationDate
        ? format(data.expirationDate.toDate(), "Pp")
        : null,
      created: data?.created ? format(data.created.toDate(), "Pp") : null,
      updated: data?.updated ? format(data.updated.toDate(), "Pp") : null,
      id: d.id,
    };
  });

  return memberships;
}

function buildQuery(filters: { [key: string]: string } | null) {
  if (!filters) {
    return [];
  }
  const queryConditions = Object.keys(omit(["status"], filters))
    .filter((k) => !(isNil(filters[k]) || isEmpty(filters[k])))
    .map((k) => where(k, "==", filters[k].trim()));
  console.log(queryConditions);
  const statusConditions =
    queryConditions.length <= 0 && filters.status
      ? buildStatusCondition(filters.status as any)
      : [];

  return statusConditions.concat(queryConditions);
}
function buildStatusCondition(status: MembershipStatus) {
  // console.log(status);
  switch (status) {
    case MembershipStatus.REQUESTED:
      return [where("expirationDate", "==", null)];
    case MembershipStatus.ACTIVE:
      return [where("expirationDate", ">", new Date())];
    case MembershipStatus.EXPIRED:
      return [where("expirationDate", "<", new Date())];
    case MembershipStatus.EXPIRED:
      return [where("expirationDate", "<", new Date())];
  }
}

// export async function loadMemberships(
//   filters: { [key: string]: string } | null = null
// ) {
//   // const queryConditions = buildQuery(filters);

//   const membershipsCol = collection(firestoreDb, "memberships");
//   try {
//     const reqResult = await getDocs(membershipsCol);
//     console.log(reqResult);

//     const membershipsFiltered = reqResult.docs.map((d) => {
//       const data = d.data();

//       return {
//         ...data,
//         originalExpirationDate: data?.expirationDate,
//         originalCreatedAt: data?.created,
//         originalUpdatedAt: data?.updated,
//         expirationDate: data?.expirationDate
//           ? format(data.expirationDate.toDate(), "Pp")
//           : null,
//         created: data?.created ? format(data.created.toDate(), "Pp") : null,
//         updated: data?.updated ? format(data.updated.toDate(), "Pp") : null,
//         id: d.id,
//       };
//     });

//     return membershipsFiltered;
//   } catch (e) {
//     console.log(e);
//     return loadMembershipsStatic(filters);
//   }
// }
