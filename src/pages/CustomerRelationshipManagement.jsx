import MembershipTable from "../components/Table/MembershipTable";
import UserInfoTable from "../components/Table/UsersTable";
import Breadcrumb from "../components/Breadcrump";
import { useLoaderData } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function CustomerRelationshipManagementPage() {
  const { memberships, users } = useLoaderData();
  return (
    <>
      <Breadcrumb pageName="CRM" />
      <div className="space-y-8">
        <MembershipTable memberships={memberships} />
        <UserInfoTable users={users} />
      </div>
    </>
  );
}

export async function loader() {
  const membershipQuerySnapshot = await getDocs(collection(db, "Membership"));
  const memberships = membershipQuerySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const userQuerySnapshot = await getDocs(collection(db, "users"));
  const users = userQuerySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("Memberships:", memberships);
  console.log("Users:", users);

  return { memberships, users };
}
