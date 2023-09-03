import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { setAuthToken } from "../../libs/utils/auth.helpers";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("access_token");

    if (token) {
      setAuthToken(token);
      navigate("/", {
        preventScrollReset: false,
        replace: true,
      });
    }
  }, [navigate, searchParams]);

  return (
    <div>
      <p>Authenticating...</p>
    </div>
  );
}

export default Auth;
