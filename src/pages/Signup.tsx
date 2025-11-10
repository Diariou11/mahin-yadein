import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  
  // Redirect to login page immediately
  useEffect(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
}
