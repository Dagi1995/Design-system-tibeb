// app/detailform/page.tsx
import { TicketForm } from "@/components/TicketForm";

export default function DetailFormPage() {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Ticket Form Page</h1>
      <TicketForm />
    </div>
  );
}
