"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button, ButtonProps, addToast } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import LoadingDots from "@/components/icons/loading-dots";

interface LoginButtonProps extends ButtonProps {
  provider: string;
  startContent?: React.ReactNode;
  variant?: ButtonProps["variant"];
  children?: React.ReactNode;
}

export default function LoginButton(props: LoginButtonProps) {
  const { provider, startContent, variant, children } = props;

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuthActions();

  // get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && addToast({ color: "danger", title: errorMessage });
  }, [error]);

  return (
    <Button
      size="lg"
      variant={variant}
      isLoading={loading}
      onPress={() => {
        setLoading(true);
        signIn(provider);
      }}
      startContent={!loading && startContent}
      spinner={<LoadingDots color="#A8A29E" />}
      {...props}
    >
      {children}
    </Button>
  );
}
