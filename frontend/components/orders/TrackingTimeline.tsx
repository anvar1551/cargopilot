"use client";

import { cn } from "@/lib/utils";
import { CircleDot } from "lucide-react";

interface TrackingEvent {
  status: string;
  region: string;
  warehouse: string;
  timestamp: string;
}

interface TrackingTimelineProps {
  tracking: TrackingEvent[];
}

export default function TrackingTimeline({ tracking }: TrackingTimelineProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">📍 Package Tracking</h2>
      <div className="relative border-l-2 border-muted pl-4 space-y-6">
        {tracking.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No tracking events available yet.
          </p>
        )}

        {tracking.map((event, index) => (
          <div key={index} className="relative pl-4">
            <CircleDot
              className={cn(
                "absolute -left-[0.63rem] top-1.5 h-4 w-4",
                "text-primary"
              )}
            />
            <div className="text-sm">
              <p>
                <strong>Status:</strong> {event.status}
              </p>
              <p>
                <strong>Region:</strong> {event.region}
              </p>
              <p>
                <strong>Warehouse:</strong> {event.warehouse}
              </p>
              <p className="text-muted-foreground text-xs">
                {new Date(event.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
