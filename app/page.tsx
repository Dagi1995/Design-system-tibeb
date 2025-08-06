import { Separator } from "@/design-system/src/components/atoms/Separator";
import { LoginForm } from "@/design-system/src/components/organisms/LoginForm";

export default function Home() {
  return (
   <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <Separator orientation="vertical"></Separator>
        <Separator orientation="horizontal"></Separator>


<LoginForm></LoginForm>

   </div>
  );
}
