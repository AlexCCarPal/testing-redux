import { useEffect, useState } from "react";
import { MembershipStatus } from "./status";
import { loadMemberships, deleteMembership, updateMembership } from "../../api";

const useMembershipState = () => {
  const [membershipsList, setMembershipsList] = useState<any>([]);
  const [filters, setFilterValue] = useState<any>({
    status: MembershipStatus.EXPIRED,
  });
  const [filterVersion, setFilterVersion] = useState(0);

  const handleFilterChange = (key: string, value: string) => {
    setFilterValue({
      ...filters,
      [key]: value,
    });
  };

  const handleSearch = () => setFilterVersion(filterVersion + 1);

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

  useEffect(() => {
    // loadMemberships(filters).then((res) => setMembershipsList(res));
    setMembershipsList(loadMemberships(filters));
  }, [filterVersion]);

  return {
    filters,
    membershipsList,
    handleFilterChange,
    handleSearch,
    handleDeleteMembership,
    handleUpdateMembership,
  };
};

export default useMembershipState;
