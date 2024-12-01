import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const adminDocRef = doc(db, "Admin", user.email);
        const adminSnapshot = await getDoc(adminDocRef);
        setIsAdmin(adminSnapshot.exists() && adminSnapshot.data().isActive);
      }
      setChecking(false);
    };

    checkAdmin();
  }, [user]);

  if (loading || checking) return <p>Loading...</p>;
  if (!user || !isAdmin) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
