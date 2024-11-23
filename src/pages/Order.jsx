import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import Breadcrumb from "../components/Breadcrump";
import OrderTable from "../components/Table/OrderTable";
import { db } from "../firebase";
import { useLoaderData } from "react-router-dom";

export default function OrderPage() {
  const orders = useLoaderData();
  return (
    <>
      <Breadcrumb pageName="Order" />
      <OrderTable orders={orders} />
    </>
  );
}

async function getUserInfo(userId) {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() ? userDoc.data() : null;
}

export async function loader() {
  const orderSnapshot = await getDocs(collection(db, "Orders"));
  const orders = await Promise.all(
    orderSnapshot.docs.map(async (doc) => {
      const order = { id: doc.id, ...doc.data() };
      const userInfo = await getUserInfo(order.userId);
      return {
        ...order,
        userInfo,
      };
    })
  );
  return orders;
}
