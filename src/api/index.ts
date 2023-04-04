import {
  getDocs,
  collection,
  query,
  where,
  doc,
  setDoc,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { firestoreDb } from "../firebase";

import { isNil, omit } from "ramda";
import { MembershipStatus } from "../pages/memberships/status";

import format from "date-fns/format";
import { sampleMemberships } from "./sampleMemberships";

export async function createMembership(membership: any) {
  const docRef = await addDoc(
    collection(firestoreDb, "memberships"),
    membership
  );
  return docRef;
}

export function updateMembership(membershipId: number, membership: any) {
  return sampleMemberships;
}

export async function updateExpirationDate(
  membershipId: string,
  expirationDate: Date
) {
  await setDoc(
    doc(firestoreDb, "memberships", membershipId),
    { expirationDate: Timestamp.fromDate(expirationDate), updated: new Date() },

    { merge: true }
  );
  return membershipId;
}

export async function deleteMembership(membership: any) {
  await setDoc(
    doc(firestoreDb, "memberships", membership.id),
    { deleted: true },
    { merge: true }
  );
  return membership.id;
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

  const memberships = reqResult.docs
    .filter((d) => !d.data().deleted)
    .map((d) => {
      const data = d.data();

      return {
        ...data,
        email: data.email,
        phone: data.phone,
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
  if (!isNil(filters)) {
    const keys = Object.keys(omit(["status"], filters));

    const membershipsFiltered = memberships.filter((m: any) => {
      return keys.every((key) => {
        return m[key]?.includes(filters[key]);
      });
    });
    return membershipsFiltered;
  }
  return memberships;
}

function buildQuery(filters: { [key: string]: string } | null) {
  if (!filters) {
    return [];
  }
  // const queryConditions = Object.keys(omit(["status"], filters))
  //   .filter((k) => !(isNil(filters[k]) || isEmpty(filters[k])))
  //   .map((k) => where(k, "==", filters[k].trim()));

  // const statusConditions =
  //   queryConditions.length <= 0 && filters.status
  //     ? buildStatusCondition(filters.status as any)
  //     : [];

  // return statusConditions.concat(queryConditions);
  return filters.status ? buildStatusCondition(filters.status as any) : [];
}
function buildStatusCondition(status: MembershipStatus) {
  switch (status) {
    case MembershipStatus.REQUESTED:
      return [where("expirationDate", "==", null)];
    case MembershipStatus.ACTIVE:
      return [where("expirationDate", ">", new Date())];
    case MembershipStatus.EXPIRED:
      return [where("expirationDate", "<", new Date())];
  }
}
