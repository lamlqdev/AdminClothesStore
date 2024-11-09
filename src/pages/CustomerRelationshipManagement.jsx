import MembershipTable from "../components/Table/MembershipTable";
import UserInfoTable from "../components/Table/UsersTable";
import Breadcrumb from "../components/Breadcrump";
import { useLoaderData } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function CustomerRelationshipManagementPage() {
  const memberships = useLoaderData();
  return (
    <>
      <Breadcrumb pageName="CRM" />
      <div className="space-y-8">
        <MembershipTable memberships={memberships} />
        <UserInfoTable />
      </div>
    </>
  );
}

export async function loader() {
  const querySnapshot = await getDocs(collection(db, "Membership"));

  const memberships = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(memberships);
  return memberships;
}
