"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/design-system/src/components/molecules/Card";
import { ArrowUp, ArrowDown, Ticket, Inbox, CheckCircle } from "lucide-react";
import { Badge } from "@/design-system/src/components/atoms/Badge";
import { Spinner } from "@/design-system/src/components/atoms/Spinner";

// KPI type
type KPI = {
  title: string;
  value: number;
  icon?: React.ReactNode;
  trend?: "up" | "down";
  color?: "default" | "green" | "red" | "blue";
};

// Dummy data (replace with API call to database)
const kpis: KPI[] = [
  {
    title: "Total Tickets Today",
    value: 60,
    icon: <Ticket className="w-6 h-6 text-blue-500" />,
    trend: "up",
    color: "blue",
  },
  {
    title: "Open Tickets",
    value: 18,
    icon: <Inbox className="w-6 h-6 text-red-500" />,
    trend: "down",
    color: "red",
  },
  {
    title: "In Progress",
    value: 12,
    icon: <Spinner className="!w-6 !h-6 !text-yellow-500 !animate-spin" />,
    trend: "up",
    color: "default",
  },
  {
    title: "Closed Tickets",
    value: 30,
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    trend: "up",
    color: "green",
  },
];

const StatsCards = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Ticket Stats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <Card
            key={kpi.title}
            className="hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer"
          >
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {kpi.icon}
                <CardTitle className="text-sm text-gray-500">
                  {kpi.title}
                </CardTitle>
              </div>
              {kpi.trend && (
                <Badge
                  variant={
                    kpi.color === "green"
                      ? "success"
                      : kpi.color === "red"
                      ? "destructive"
                      : kpi.color === "blue"
                      ? "secondary"
                      : "default"
                  }
                  className="flex items-center gap-1 px-2 py-1 transition-colors duration-300"
                >
                  {kpi.trend === "up" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {kpi.trend === "up" ? "Up" : "Down"}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">{kpi.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
