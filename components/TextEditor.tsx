import RichTextEditor from "@/design-system/src/components/organisms/TextEditor";
import { useState } from "react";

export default function ExamplePage() {
  const [value, setValue] = useState("<p>Hello World!</p>");

  return (
    <div className="p-4">
      <RichTextEditor
        content={value}
        onChange={setValue}
        className="bg-white"
        showToolbar
      />
      <p className="mt-4">Editor Output:</p>
      <div className="border p-2">{value}</div>
    </div>
  );
}
