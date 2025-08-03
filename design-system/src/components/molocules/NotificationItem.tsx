import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/atoms/Avatar"
import { cn } from "@/lib/utils"

export interface NotificationItemProps {
  avatarUrl: string
  username: string
  action: string
  timeAbsolute: string
  timeRelative: string
  unread?: boolean
  className?: string
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  avatarUrl,
  username,
  action,
  timeAbsolute,
  timeRelative,
  unread = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-between rounded-md bg-white px-4 py-3",
        "shadow-sm border border-muted transition-colors",
        className
      )}
    >
      {/* Left side: Avatar + Text */}
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <div className="text-sm text-foreground">
            <span className="font-medium">@{username}</span> {action}
          </div>
          <div className="text-xs text-muted-foreground">{timeAbsolute}</div>
        </div>
      </div>

      {/* Right side: time + unread dot */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {timeRelative}
        </span>
        {unread && <span className="size-2 rounded-full bg-blue-500" />}
      </div>
    </div>
  )
}
