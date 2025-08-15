/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import {
  format,
  addMonths,
  addWeeks,
  addDays,
  isSameDay,
  isSameMonth,
  isSameWeek,
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
} from "date-fns";
import { ChevronLeft, ChevronRight, X, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../atoms/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../atoms/Popover";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../atoms/Tabs";

type EventColor =
  | "blue"
  | "green"
  | "red"
  | "orange"
  | "yellow"
  | "teal"
  | "violet"
  | "cyan"
  | "purple"
  | "pink"
  | "amber";

interface CalendarEvent {
  title: string;
  participant: string;
  id: string;
  venue: string;
  fromDate: string | Date;
  toDate: string | Date;
  color?: EventColor;
  isFullDay?: boolean;
  type_of_event?: string;
}

interface CalendarConfig {
  disableModes?: ("Day" | "Week" | "Month")[];
  defaultMode?: "Day" | "Week" | "Month";
  isEditMode?: boolean;
  eventIcons?: Record<string, React.ReactNode>;
  redundantCellHeight?: number;
  hourHeight?: number;
  enableShortcuts?: boolean;
  showIcon?: boolean;
}

interface CalendarProps {
  events?: CalendarEvent[];
  config?: CalendarConfig;
  onCreate?: (event: CalendarEvent) => void;
  onUpdate?: (event: CalendarEvent) => void;
  onDelete?: (id: string) => void;
  onClick?: (data: {
    e: React.MouseEvent;
    calendarEvent: CalendarEvent;
  }) => void;
  onDblClick?: (data: {
    e: React.MouseEvent;
    calendarEvent: CalendarEvent;
  }) => void;
  onCellDblClick?: (data: {
    e: React.MouseEvent;
    date: Date;
    time: string;
    view: "Day" | "Week" | "Month";
  }) => void;
  children?: React.ReactNode;
}

const colorMap: Record<EventColor, string> = {
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  green: "bg-green-100 text-green-800 border-green-200",
  red: "bg-red-100 text-red-800 border-red-200",
  orange: "bg-orange-100 text-orange-800 border-orange-200",
  yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
  teal: "bg-teal-100 text-teal-800 border-teal-200",
  violet: "bg-violet-100 text-violet-800 border-violet-200",
  cyan: "bg-cyan-100 text-cyan-800 border-cyan-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
  pink: "bg-pink-100 text-pink-800 border-pink-200",
  amber: "bg-amber-100 text-amber-800 border-amber-200",
};

export const CalendarContext = React.createContext<{
  currentMonthYear: string;
  activeView: "Day" | "Week" | "Month";
  setActiveView: (view: "Day" | "Week" | "Month") => void;
  decrement: () => void;
  increment: () => void;
}>({
  currentMonthYear: "",
  activeView: "Month",
  setActiveView: () => {},
  decrement: () => {},
  increment: () => {},
});

const Calendar: React.FC<CalendarProps> = ({
  events = [],
  config = {},
  onCreate,
  onUpdate,
  onDelete,
  onClick,
  onDblClick,
  onCellDblClick,
  children,
}) => {
  const {
    disableModes = [],
    defaultMode = "Month",
    isEditMode = false,
    eventIcons = {},
    redundantCellHeight = 50,
    hourHeight = 50,
    enableShortcuts = true,
    showIcon = true,
  } = config;

  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const [activeView, setActiveView] = React.useState<"Day" | "Week" | "Month">(
    defaultMode
  );
  const [selectedEvent, setSelectedEvent] =
    React.useState<CalendarEvent | null>(null);

  // Parse event dates
  const parsedEvents = React.useMemo(() => {
    return events.map((event) => ({
      ...event,
      fromDate:
        typeof event.fromDate === "string"
          ? parseISO(event.fromDate)
          : event.fromDate,
      toDate:
        typeof event.toDate === "string"
          ? parseISO(event.toDate)
          : event.toDate,
      color: Object.keys(colorMap).includes(event.color || "")
        ? (event.color as EventColor)
        : "green",
    }));
  }, [events]);

  // Handle keyboard shortcuts
  React.useEffect(() => {
    if (!enableShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "m":
          if (!disableModes.includes("Month")) {
            setActiveView("Month");
          }
          break;
        case "w":
          if (!disableModes.includes("Week")) {
            setActiveView("Week");
          }
          break;
        case "d":
          if (!disableModes.includes("Day")) {
            setActiveView("Day");
          }
          break;
        case "ArrowLeft":
          navigate(-1);
          break;
        case "ArrowRight":
          navigate(1);
          break;
        case "Delete":
          if (selectedEvent && isEditMode) {
            handleDeleteEvent(selectedEvent.id);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeView, selectedEvent, isEditMode, enableShortcuts, disableModes]);

  const navigate = (direction: number) => {
    if (activeView === "Month") {
      setCurrentDate(addMonths(currentDate, direction));
    } else if (activeView === "Week") {
      setCurrentDate(addWeeks(currentDate, direction));
    } else {
      setCurrentDate(addDays(currentDate, direction));
    }
  };

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);

    if (onClick) {
      onClick({ e, calendarEvent: event });
    }
  };

  const handleEventDblClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();

    if (onDblClick) {
      onDblClick({ e, calendarEvent: event });
      return;
    }

    if (isEditMode && onUpdate) {
      // In a real implementation, you'd open an edit modal here
      console.log("Edit event:", event);
    }
  };

  const handleCellDblClick = (
    e: React.MouseEvent,
    date: Date,
    time?: string
  ) => {
    if (onCellDblClick) {
      onCellDblClick({ e, date, time: time || "", view: activeView });
      return;
    }

    if (isEditMode && onCreate) {
      // In a real implementation, you'd open a create modal here
      const newEvent: CalendarEvent = {
        title: "New Event",
        participant: "",
        id: `event-${Date.now()}`,
        venue: "",
        fromDate: time
          ? setHours(
              setMinutes(date, parseInt(time.split(":")[1]) || 0),
              parseInt(time.split(":")[0]) || 0
            )
          : date,
        toDate: time
          ? setHours(
              setMinutes(date, parseInt(time.split(":")[1]) || 0),
              parseInt(time.split(":")[0]) || 0
            )
          : date,
        color: "green",
        isFullDay: !time,
      };
      onCreate(newEvent);
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (onDelete) {
      onDelete(id);
    }
    setSelectedEvent(null);
  };

  const renderHeader = () => {
    const enabledModes = ["Day", "Week", "Month"].filter(
      (mode) => !disableModes.includes(mode as "Day" | "Week" | "Month")
    ) as ("Day" | "Week" | "Month")[];

    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-lg font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
        </div>
        <Tabs
          value={activeView}
          onValueChange={(value) =>
            setActiveView(value as "Day" | "Week" | "Month")
          }
        >
          <TabsList>
            {enabledModes.map((mode) => (
              <TabsTrigger key={mode} value={mode}>
                {mode}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weeks: Date[][] = [];

    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="grid grid-cols-7 gap-px border rounded-md">
        {/* Day headers */}
        <div className="col-span-7 grid grid-cols-7 bg-gray-100 rounded-t-md">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar cells */}
        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="col-span-7 grid grid-cols-7 bg-gray-50"
          >
            {week.map((day, dayIndex) => {
              const dayEvents = parsedEvents.filter(
                (event) =>
                  isSameDay(event.fromDate, day) ||
                  (event.isFullDay && isSameDay(event.fromDate, day))
              );

              return (
                <div
                  key={dayIndex}
                  className={cn(
                    "min-h-24 p-1 border border-gray-200",
                    !isSameMonth(day, currentDate)
                      ? "bg-gray-50 text-gray-400"
                      : "bg-white",
                    weekIndex === weeks.length - 1 && "rounded-b-md"
                  )}
                  onDoubleClick={(e) => handleCellDblClick(e, day)}
                >
                  <div className="flex justify-between">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isSameDay(day, new Date())
                          ? "bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          : ""
                      )}
                    >
                      {format(day, "d")}
                    </span>
                  </div>
                  <div className="mt-1 space-y-1 overflow-y-auto max-h-20">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "text-xs p-1 rounded truncate cursor-pointer border",
                          colorMap[event.color || "green"],
                          event.isFullDay ? "w-full" : "w-full"
                        )}
                        onClick={(e) => handleEventClick(e, event)}
                        onDoubleClick={(e) => handleEventDblClick(e, event)}
                      >
                        {showIcon &&
                          event.type_of_event &&
                          eventIcons[event.type_of_event] && (
                            <span className="mr-1 inline-block">
                              {eventIcons[event.type_of_event]}
                            </span>
                          )}
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const hours = Array.from({ length: 24 }, (_, i) => i);

    // Get all events for the week
    const weekEvents = parsedEvents.filter(
      (event) =>
        isSameWeek(event.fromDate, currentDate) ||
        (event.isFullDay && isSameWeek(event.fromDate, currentDate))
    );

    // Separate full day events
    const fullDayEvents = weekEvents.filter((event) => event.isFullDay);
    const timedEvents = weekEvents.filter((event) => !event.isFullDay);

    return (
      <div className="flex flex-col border rounded-md">
        {/* Day headers */}
        <div className="grid grid-cols-8 border-b">
          <div
            className="p-2 text-sm font-medium text-gray-500"
            style={{ height: `${redundantCellHeight}px` }}
          >
            All Day
          </div>
          {days.map((day) => (
            <div
              key={day.toString()}
              className={cn(
                "p-2 text-center text-sm font-medium border-l",
                isSameDay(day, new Date())
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500"
              )}
            >
              <div>{format(day, "EEE")}</div>
              <div
                className={cn(
                  "rounded-full w-6 h-6 flex items-center justify-center mx-auto",
                  isSameDay(day, new Date()) ? "bg-blue-500 text-white" : ""
                )}
              >
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>

        {/* Full day events */}
        {fullDayEvents.length > 0 && (
          <div
            className="grid grid-cols-8 border-b"
            style={{ height: `${redundantCellHeight}px` }}
          >
            <div className="p-1 text-xs text-gray-500 border-r">All Day</div>
            {days.map((day, dayIndex) => {
              const dayEvents = fullDayEvents.filter((event) =>
                isSameDay(event.fromDate, day)
              );
              return (
                <div
                  key={dayIndex}
                  className="p-1 border-l overflow-hidden"
                  onDoubleClick={(e) => handleCellDblClick(e, day)}
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "text-xs p-1 rounded truncate cursor-pointer border mb-1",
                        colorMap[event.color || "green"]
                      )}
                      onClick={(e) => handleEventClick(e, event)}
                      onDoubleClick={(e) => handleEventDblClick(e, event)}
                    >
                      {showIcon &&
                        event.type_of_event &&
                        eventIcons[event.type_of_event] && (
                          <span className="mr-1 inline-block">
                            {eventIcons[event.type_of_event]}
                          </span>
                        )}
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Time slots */}
        <div className="flex overflow-auto">
          {/* Time column */}
          <div className="w-16 flex-shrink-0 border-r">
            {hours.map((hour) => (
              <div
                key={hour}
                className="text-xs text-gray-500 text-right pr-2"
                style={{ height: `${hourHeight}px` }}
              >
                {format(setHours(new Date(), hour), "h a")}
              </div>
            ))}
          </div>

          {/* Day columns */}
          <div className="grid grid-cols-7 flex-1">
            {days.map((day) => (
              <div
                key={day.toString()}
                className="relative border-r last:border-r-0"
              >
                {hours.map((hour) => {
                  const hourStart = setHours(day, hour);
                  const hourEnd = setHours(day, hour + 1);

                  const hourEvents = timedEvents.filter((event) => {
                    const eventStart = event.fromDate;
                    const eventEnd = event.toDate;
                    return (
                      (eventStart >= hourStart && eventStart < hourEnd) ||
                      (eventEnd > hourStart && eventEnd <= hourEnd) ||
                      (eventStart <= hourStart && eventEnd >= hourEnd)
                    );
                  });

                  return (
                    <div
                      key={hour}
                      className={cn(
                        "border-b border-gray-100 hover:bg-gray-50",
                        isSameDay(day, new Date()) && "bg-blue-50"
                      )}
                      style={{ height: `${hourHeight}px` }}
                      onDoubleClick={(e) =>
                        handleCellDblClick(e, day, `${hour}:00`)
                      }
                    >
                      {hourEvents.map((event) => {
                        const eventStart = event.fromDate;
                        const eventEnd = event.toDate;
                        const startsInHour =
                          eventStart >= hourStart && eventStart < hourEnd;
                        const endsInHour =
                          eventEnd > hourStart && eventEnd <= hourEnd;
                        const spansHour =
                          eventStart <= hourStart && eventEnd >= hourEnd;

                        if (startsInHour || spansHour) {
                          const durationHours =
                            (eventEnd.getTime() - eventStart.getTime()) /
                            (1000 * 60 * 60);
                          const height = Math.max(
                            1,
                            Math.min(durationHours * hourHeight, hourHeight)
                          );

                          return (
                            <div
                              key={event.id}
                              className={cn(
                                "absolute text-xs p-1 rounded cursor-pointer border overflow-hidden",
                                colorMap[event.color || "green"],
                                startsInHour ? "ml-1 mr-1" : "ml-0 mr-0"
                              )}
                              style={{
                                top: `${
                                  (getHours(eventStart) +
                                    getMinutes(eventStart) / 60 -
                                    hour) *
                                  hourHeight
                                }px`,
                                height: `${height}px`,
                                width: "calc(100% - 8px)",
                              }}
                              onClick={(e) => handleEventClick(e, event)}
                              onDoubleClick={(e) =>
                                handleEventDblClick(e, event)
                              }
                            >
                              {showIcon &&
                                event.type_of_event &&
                                eventIcons[event.type_of_event] && (
                                  <span className="mr-1 inline-block">
                                    {eventIcons[event.type_of_event]}
                                  </span>
                                )}
                              <div className="truncate">{event.title}</div>
                              <div className="text-xs opacity-70 truncate">
                                {format(eventStart, "h:mm a")} -{" "}
                                {format(eventEnd, "h:mm a")}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // Get all events for the day
    const dayEvents = parsedEvents.filter(
      (event) =>
        isSameDay(event.fromDate, currentDate) ||
        (event.isFullDay && isSameDay(event.fromDate, currentDate))
    );

    // Separate full day events
    const fullDayEvents = dayEvents.filter((event) => event.isFullDay);
    const timedEvents = dayEvents.filter((event) => !event.isFullDay);

    return (
      <div className="flex flex-col border rounded-md">
        {/* Day header */}
        <div className="p-2 text-center text-lg font-medium bg-gray-50 rounded-t-md">
          {format(currentDate, "EEEE, MMMM d, yyyy")}
        </div>

        {/* Full day events */}
        {fullDayEvents.length > 0 && (
          <div
            className="p-2 border-b"
            style={{ height: `${redundantCellHeight}px` }}
          >
            <div className="text-xs font-medium text-gray-500 mb-1">
              All Day
            </div>
            <div className="flex flex-wrap gap-1">
              {fullDayEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "text-xs p-1 rounded cursor-pointer border",
                    colorMap[event.color || "green"]
                  )}
                  onClick={(e) => handleEventClick(e, event)}
                  onDoubleClick={(e) => handleEventDblClick(e, event)}
                >
                  {showIcon &&
                    event.type_of_event &&
                    eventIcons[event.type_of_event] && (
                      <span className="mr-1 inline-block">
                        {eventIcons[event.type_of_event]}
                      </span>
                    )}
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Time slots */}
        <div className="flex overflow-auto">
          {/* Time column */}
          <div className="w-16 flex-shrink-0 border-r">
            {hours.map((hour) => (
              <div
                key={hour}
                className="text-xs text-gray-500 text-right pr-2"
                style={{ height: `${hourHeight}px` }}
              >
                {format(setHours(new Date(), hour), "h a")}
              </div>
            ))}
          </div>

          {/* Events column */}
          <div className="flex-1 relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className="border-b border-gray-100 hover:bg-gray-50"
                style={{ height: `${hourHeight}px` }}
                onDoubleClick={(e) =>
                  handleCellDblClick(e, currentDate, `${hour}:00`)
                }
              >
                {/* Hour line */}
              </div>
            ))}

            {timedEvents.map((event) => {
              const eventStart = event.fromDate;
              const eventEnd = event.toDate;
              const durationHours =
                (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60);
              const top =
                (getHours(eventStart) + getMinutes(eventStart) / 60) *
                hourHeight;
              const height = Math.max(1, durationHours * hourHeight);

              return (
                <div
                  key={event.id}
                  className={cn(
                    "absolute text-xs p-1 rounded cursor-pointer border ml-1 mr-1",
                    colorMap[event.color || "green"]
                  )}
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    width: "calc(100% - 16px)",
                  }}
                  onClick={(e) => handleEventClick(e, event)}
                  onDoubleClick={(e) => handleEventDblClick(e, event)}
                >
                  {showIcon &&
                    event.type_of_event &&
                    eventIcons[event.type_of_event] && (
                      <span className="mr-1 inline-block">
                        {eventIcons[event.type_of_event]}
                      </span>
                    )}
                  <div className="font-medium truncate">{event.title}</div>
                  <div className="text-xs opacity-70 truncate">
                    {format(eventStart, "h:mm a")} -{" "}
                    {format(eventEnd, "h:mm a")}
                  </div>
                  <div className="text-xs opacity-70 truncate">
                    {event.venue}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const contextValue = {
    currentMonthYear: format(currentDate, "MMMM yyyy"),
    activeView,
    setActiveView,
    decrement: () => navigate(-1),
    increment: () => navigate(1),
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      <div className="flex flex-col h-full">
        {children ? children : renderHeader()}

        <div className="flex-1 overflow-auto">
          {activeView === "Month" && renderMonthView()}
          {activeView === "Week" && renderWeekView()}
          {activeView === "Day" && renderDayView()}
        </div>

        {/* Event popover */}
        {selectedEvent && (
          <Popover
            open={!!selectedEvent}
            onOpenChange={(open) => !open && setSelectedEvent(null)}
          >
            <PopoverTrigger asChild>
              <div className="hidden"></div>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{selectedEvent.title}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedEvent.participant}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEvent(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-2 space-y-2">
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-20">Time:</span>
                  <span>
                    {selectedEvent.isFullDay
                      ? format(selectedEvent.fromDate, "MMM d, yyyy") +
                        " (All Day)"
                      : `${format(
                          selectedEvent.fromDate,
                          "MMM d, h:mm a"
                        )} - ${format(selectedEvent.toDate, "h:mm a")}`}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-20">Venue:</span>
                  <span>{selectedEvent.venue}</span>
                </div>
              </div>

              {isEditMode && (
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (onUpdate) onUpdate(selectedEvent);
                      setSelectedEvent(null);
                    }}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </CalendarContext.Provider>
  );
};

export default Calendar;
