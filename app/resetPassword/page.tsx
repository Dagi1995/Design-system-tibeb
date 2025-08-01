"use client"
import { ResetPasswordForm } from "@/design-system/src/components/organisms/ResetPasswordForm"

export default function ResetPasswordPage (){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
              <div className="w-full">
                <ResetPasswordForm></ResetPasswordForm>
                
              </div>
            </div>

    )
}