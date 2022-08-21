import { supabase } from "supabase/config";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const WrapperAuth = ({
  children,
}: {
  children: React.ReactNode | React.ReactFragment;
}) => {
  const router = useRouter();
  const session = supabase.auth.session();

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, router]);

  return <>{session && children}</>;
};

export default WrapperAuth;
