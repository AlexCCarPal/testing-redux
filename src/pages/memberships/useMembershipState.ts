import { useEffect, useState } from "react";
import { MembershipStatus } from "./status";
import {
  loadMemberships,
  deleteMembership,
  updateMembership,
  createMembership,
  updateExpirationDate,
} from "../../api";

const useMembershipState = () => {
  const [membershipsList, setMembershipsList] = useState<any>([]);
  const [filters, setFilterValue] = useState<any>({
    status: MembershipStatus.ACTIVE,
  });
  const [filterVersion, setFilterVersion] = useState(0);

  const handleFilterChange = (key: string, value: string) => {
    setFilterValue({
      ...filters,
      [key]: value,
    });
  };

  const handleSearch = () => setFilterVersion(filterVersion + 1);

  const handleCreateMembership = async (membership: any) => {
    await createMembership(membership);
    setFilterVersion(filterVersion + 1);
  };

  const handleDeleteMembership = async (membership: any) => {
    await deleteMembership(membership);
    setFilterVersion(filterVersion + 1);
  };
  const handleUpdateMembership = async (
    membershipId: number,
    membership: any
  ) => {
    await updateMembership(membershipId, membership);
    setFilterVersion(filterVersion + 1);
  };
  const handleUpdateExpirationDate = async (
    membershipId: string,
    expirationDate: Date
  ) => {
    await updateExpirationDate(membershipId, expirationDate);
    setFilterVersion(filterVersion + 1);
  };

  useEffect(() => {
    loadMemberships(filters).then((res) => setMembershipsList(res));
  }, [filterVersion]);

  return {
    filters,
    membershipsList,
    handleFilterChange,
    handleSearch,
    handleCreateMembership,
    handleDeleteMembership,
    handleUpdateMembership,
    handleUpdateExpirationDate,
  };
};

export default useMembershipState;
