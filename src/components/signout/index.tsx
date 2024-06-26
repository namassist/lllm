"use client";

import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const Signout = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/`,
        })
      }
    >
      logout
    </Button>
  );
};

export default Signout;
