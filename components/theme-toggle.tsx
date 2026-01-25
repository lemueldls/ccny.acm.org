import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      onPress={toggleTheme}
      title={resolvedTheme === "dark" ? "Light Theme" : "Dark Theme"}
      color="default"
      variant="light"
      isIconOnly
    >
      {resolvedTheme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </Button>
  );
}
