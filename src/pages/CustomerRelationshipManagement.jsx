import MembershipTable from "../components/Table/MembershipTable";
import UserInfoTable from "../components/Table/UsersTable";
import Breadcrumb from "../components/Breadcrump";

export default function CustomerRelationshipManagementPage() {
  return (
    <>
      <Breadcrumb pageName="CRM" />
      <div className="space-y-8">
        <MembershipTable />
        <UserInfoTable />
      </div>
    </>
  );
}
