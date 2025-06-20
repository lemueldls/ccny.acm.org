"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import LoadingDots from "@/components/icons/loading-dots";
import { addToast, Button, ButtonProps } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

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

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && addToast({ title: errorMessage, color: "danger" });
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
