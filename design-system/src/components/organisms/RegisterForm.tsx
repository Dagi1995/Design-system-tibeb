"use client"

import * as React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../molocules/card"
import { Label } from "../atoms/label"
import { Input } from "../atoms/input"
import { Checkbox } from "../atoms/checkbox"
import { Button } from "../atoms/button"

export function RegisterForm() {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg border border-muted bg-background">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-semibold">Create an Account</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Start your journey with us by filling out the details below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="firstname">First Name</Label>
              <Input id="firstname" placeholder="John" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastname">Last Name</Label>
              <Input id="lastname" placeholder="Doe" />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 234 567 8901" />
            </div>
          </div>

          {/* Department */}
          <div className="space-y-1">
            <Label htmlFor="department">Department</Label>
            <Input id="department" placeholder="Engineering, Marketing, etc." />
          </div>

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm leading-snug">
              I agree to the <a href="#" className="underline hover:text-primary">terms and conditions</a>.
            </Label>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
