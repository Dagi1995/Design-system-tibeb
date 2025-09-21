// SupportTicketDetail.tsx
"use client";

import React, { useState, useRef } from "react";
import { DetailPage } from "@/design-system/src/components/organisms/DetailPage";
import { DetailPageRef } from "@/design-system/src/components/organisms/DetailPage";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/src/components/molecules/Card";
import { Badge } from "@/design-system/src/components/atoms/Badge";
import { Button } from "@/design-system/src/components/atoms/Button";
import { ArrowLeft, Download, Save, Edit, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface TicketData {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  category: string;
  description: string;
  dueDate: string;
  createdAt: string;
  attachments?: any[];
  status?: "Open" | "In Progress" | "Resolved" | "Closed";
  priority?: "Low" | "Medium" | "High" | "Urgent";
}

interface SupportTicketDetailProps {
  ticketData: TicketData;
  onBack?: () => void;
  onSave?: (updatedData: TicketData) => void;
  onStatusChange?: (ticketId: number, newStatus: string) => void;
  onPriorityChange?: (ticketId: number, newPriority: string) => void;
}

export function SupportTicketDetail({
  ticketData,
  onBack,
  onSave,
  onStatusChange,
  onPriorityChange,
}: SupportTicketDetailProps) {
  const detailPageRef = useRef<DetailPageRef>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(ticketData);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Open":
        return "default";
      case "In Progress":
        return "secondary";
      case "Resolved":
        return "outline";
      case "Closed":
        return "destructive";
      default:
        return "default";
    }
  };

  // Get priority badge variant
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "Low":
        return "outline";
      case "Medium":
        return "secondary";
      case "High":
        return "default";
      case "Urgent":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleSave = () => {
    if (detailPageRef.current) {
      const formData = detailPageRef.current.getFormData();

      // Update the current ticket with form data
      const updatedTicket = {
        ...currentTicket,
        ...formData,
        // Ensure proper data types
        dueDate: formData.dueDate || currentTicket.dueDate,
        description: formData.description || currentTicket.description,
      };

      setCurrentTicket(updatedTicket);

      if (onSave) {
        onSave(updatedTicket);
      }

      setIsEditing(false);
      toast.success("Ticket updated successfully!");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    toast.info("Edit cancelled");
  };

  const handleStatusChange = (newStatus: string) => {
    const updatedTicket = { ...currentTicket, status: newStatus as any };
    setCurrentTicket(updatedTicket);

    if (onStatusChange) {
      onStatusChange(currentTicket.id, newStatus);
    }

    if (onSave) {
      onSave(updatedTicket);
    }

    toast.success(`Status changed to ${newStatus}`);
  };

  const handlePriorityChange = (newPriority: string) => {
    const updatedTicket = { ...currentTicket, priority: newPriority as any };
    setCurrentTicket(updatedTicket);

    if (onPriorityChange) {
      onPriorityChange(currentTicket.id, newPriority);
    }

    if (onSave) {
      onSave(updatedTicket);
    }

    toast.success(`Priority changed to ${newPriority}`);
  };

  // Create the tabs configuration for the DetailPage
  const tabs = [
    {
      id: "ticket-details",
      label: "Ticket Details",
      sections: [
        {
          title: "Ticket Information",
          columns: 2 as const,
          fields: [
            {
              type: "custom" as const,
              name: "status-priority",
              label: "Status & Priority",
              component: (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Badge
                      variant={getStatusVariant(currentTicket.status || "Open")}
                    >
                      Status: {currentTicket.status || "Open"}
                    </Badge>
                    <Badge
                      variant={getPriorityVariant(
                        currentTicket.priority || "Medium"
                      )}
                    >
                      Priority: {currentTicket.priority || "Medium"}
                    </Badge>
                  </div>
                  {isEditing && (
                    <div className="flex gap-2 mt-2">
                      <select
                        value={currentTicket.status || "Open"}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="p-1 border rounded text-sm"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <select
                        value={currentTicket.priority || "Medium"}
                        onChange={(e) => handlePriorityChange(e.target.value)}
                        className="p-1 border rounded text-sm"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                  )}
                </div>
              ),
            },
            {
              type: "input" as const,
              name: "id",
              label: "Ticket ID",
              defaultValue: `#${currentTicket.id}`,
              disabled: true,
            },
            {
              type: "input" as const,
              name: "subject",
              label: "Subject",
              defaultValue: currentTicket.subject,
              disabled: !isEditing,
            },
            {
              type: "input" as const,
              name: "category",
              label: "Category",
              defaultValue: currentTicket.category,
              disabled: !isEditing,
            },
            {
              type: "input" as const,
              name: "createdAt",
              label: "Created Date",
              defaultValue: formatDate(currentTicket.createdAt),
              disabled: true,
            },
            {
              type: "input" as const,
              name: "dueDate",
              label: "Due Date",
              defaultValue: currentTicket.dueDate.split("T")[0], // Format as YYYY-MM-DD for input
              disabled: !isEditing,
            },
          ],
        },
        {
          title: "Requester Information",
          columns: 2 as const,
          fields: [
            {
              type: "input" as const,
              name: "fullName",
              label: "Full Name",
              defaultValue: currentTicket.fullName,
              disabled: !isEditing,
            },
            {
              type: "input" as const,
              name: "email",
              label: "Email",
              defaultValue: currentTicket.email,
              disabled: !isEditing,
            },
            {
              type: "input" as const,
              name: "phoneNumber",
              label: "Phone Number",
              defaultValue: currentTicket.phoneNumber,
              disabled: !isEditing,
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
              label: "Description",
              defaultValue: currentTicket.description,
              required: true,
              placeholder: "Ticket description...",
              showSubmitButton: false,
              disabled: !isEditing,
            },
          ],
        },
        ...(currentTicket.attachments && currentTicket.attachments.length > 0
          ? [
              {
                title: "Attachments",
                columns: 1 as const,
                fields: [
                  {
                    type: "custom" as const,
                    name: "attachments",
                    label: "Attachments",
                    component: (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentTicket.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-md"
                          >
                            <div className="flex items-center">
                              <div className="mr-3 bg-muted p-2 rounded">
                                <Download className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium truncate max-w-[160px]">
                                  {file.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                ],
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {onBack ? (
            <Button variant="ghost" onClick={onBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          ) : (
            <Link href="/tickets">
              <Button variant="ghost" className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tickets
              </Button>
            </Link>
          )}
          <h1 className="text-2xl font-bold">Ticket Details</h1>
        </div>

        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Ticket
          </Button>
        )}
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl flex justify-between items-center">
            <span>{currentTicket.subject}</span>
            <div className="flex gap-2">
              <Badge variant={getStatusVariant(currentTicket.status || "Open")}>
                {currentTicket.status || "Open"}
              </Badge>
              <Badge
                variant={getPriorityVariant(currentTicket.priority || "Medium")}
              >
                {currentTicket.priority || "Medium"}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DetailPage
            ref={detailPageRef}
            tabs={tabs}
            title={undefined}
            hideBuiltInButtons={true}
            initialData={currentTicket}
          />
        </CardContent>
      </Card>
    </div>
  );
}

// Example usage component that connects to your table
export function TicketDetailView({
  ticketId,
  tickets,
}: {
  ticketId: number;
  tickets: any[];
}) {
  // Find the ticket in your data
  const ticket = tickets.find((t) => t.id === ticketId);

  if (!ticket) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center mb-6">
          <Link href="/tickets">
            <Button variant="ghost" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tickets
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Ticket Not Found</h1>
        </div>
        <Card className="w-full">
          <CardContent className="p-6 text-center">
            <p>Ticket with ID #{ticketId} could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = (updatedData: any) => {
    // Here you would typically update your data store or make an API call
    console.log("Saving ticket:", updatedData);
    // Update your tickets array or state here
  };

  const handleStatusChange = (ticketId: number, newStatus: string) => {
    console.log(`Changing status of ticket ${ticketId} to ${newStatus}`);
    // Update status in your data store
  };

  const handlePriorityChange = (ticketId: number, newPriority: string) => {
    console.log(`Changing priority of ticket ${ticketId} to ${newPriority}`);
    // Update priority in your data store
  };

  return (
    <SupportTicketDetail
      ticketData={ticket}
      onSave={handleSave}
      onStatusChange={handleStatusChange}
      onPriorityChange={handlePriorityChange}
    />
  );
}
