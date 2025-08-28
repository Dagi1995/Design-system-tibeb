"use client";
import { Preview } from "@/components/Preview";
import { NavigationMenu } from "@/design-system/src/components/molecules/NavigationMenu";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"NavigationMenu"} sourcePath={"design-system/src/components/molecules/NavigationMenu.tsx"}>
          <NavigationMenu />
        </Preview>
      </div>
    </div>
  );
}
