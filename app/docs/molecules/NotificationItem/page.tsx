"use client";
import { Preview } from "@/components/Preview";
import { NotificationItem } from "@/design-system/src/components/molecules/NotificationItem";

export default function DocPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full space-y-6">
        <Preview title={"NotificationItem"} sourcePath={"design-system/src/components/molecules/NotificationItem.tsx"}>
          <NotificationItem />
        </Preview>
      </div>
    </div>
  );
}
