    import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/design-system/src/components/atoms/InputOTP";

export default function Home() {
  return (
   <div className="flex flex-col items-center justify-center min-h-screen p-4">


    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
    
  


   </div>
  );
}
