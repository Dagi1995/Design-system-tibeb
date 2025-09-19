// SupportTicketForm.tsx
"use client";

import React, { useRef } from "react";
import { DetailPage } from "@/design-system/src/components/organisms/DetailPage";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/src/components/molecules/Card";
import { Button } from "@/design-system/src/components/atoms/Button";

export function TicketForm() {
  const detailPageRef = useRef<{ getFormData: () => Record<string, any> }>(
    null
  );

  const tabs = [
    {
      id: "ticket",
      label: "New Ticket",
      sections: [
        {
          title: "Ticket Info",
          columns: 2 as const,
          fields: [
            {
              type: "input" as const,
              name: "fullName",
              label: "Full Name ",
              required: true,
              placeholder: "Enter full name",
            },
            {
              type: "input" as const,
              name: "email",
              label: "Email ",
              required: true,
              placeholder: "Enter email address",
            },
            {
              type: "phone" as const,
              name: "phoneNumber",
              label: "Phone number ",
              required: true,
              placeholder: "Enter phone number",
            },
            {
              type: "input" as const,
              name: "subject",
              label: "Subject ",
              required: true,
              placeholder: "Enter subject",
            },
            {
              type: "select" as const,
              name: "category",
              label: "Category *",
              required: true,
              options: [
                "Technical Support",
                "Billing",
                "Account",
                "Feature Request",
                "Other",
              ],
              placeholder: "Select category",
            },
            {
              type: "select" as const,
              name: "subcategory",
              label: "Subcategory *",
              required: true,
              options: [
                "Database",
                "Profile",
                "Queue Management",
                "Letter Management",
                "Chat",
                "Learning Letter",
                "Letter Promotion",
                "Protection",
                "Digital Cloud",
                "Open Spatial",
                "Evaluation Manager",
                "Analysis And Name",
                "Form Manager",
                "Computer Manager",
                "Vision Management",
                "Asset Management",
                "Building Management",
                "Appointments",
                "My choice Model",
              ],
              placeholder: "Select subcategory",
            },
            {
              type: "date" as const,
              name: "dueDate",
              label: "Due date ",
              required: true,
              placeholder: "Select due date",
            },
          ],
        },
        {
          title: "File Attachments",
          columns: 1 as const,
          fields: [
            {
              type: "fileUpload" as const,
              name: "attachments",
              label: "Upload File ",
              accept: "image/*,.pdf,.doc,.docx,.txt",
              multiple: true,
              maxFiles: 5,
              maxSize: 10 * 1024 * 1024,
            },
          ],
        },
        {
          title: "Description",
          columns: 1 as const,
          fields: [
            {
              type: "textEditor" as const,
              name: "description",
              label: "Description ",
              required: true,
              placeholder: "Please describe your issue in detail...",
              showSubmitButton: false,
            },
          ],
        },
      ],
    },
  ];

  const handleSave = () => {
    if (detailPageRef.current) {
      const formData = detailPageRef.current.getFormData();
      console.log("Ticket data:", formData);

      // Validate required fields
      const requiredFields = [
        "fullName",
        "email",
        "phoneNumber",
        "subject",
        "category",
        "subcategory",
        "description",
        "dueDate",
        "subcategory",
      ];

      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        toast.error(`Please fill in all required fields`);
        return;
      }

      toast.success("Ticket submitted successfully!");
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        "Are you sure you want to cancel? All unsaved changes will be lost."
      )
    ) {
      console.log("Ticket creation cancelled");
      toast.error("Ticket creation cancelled");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">New Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <DetailPage
            ref={detailPageRef}
            tabs={tabs}
            title={undefined}
            hideBuiltInButtons={true}
          />
          {/* Custom Save/Cancel buttons inside the card */}
          <div className="flex justify-end gap-4 pt-6 mt-6 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Submit Ticket</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
