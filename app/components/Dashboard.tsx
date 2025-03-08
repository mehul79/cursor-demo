import { useEffect, useState } from "react";
import { useMyPresence, useOthers } from "../liveblocks.config";
import { Cursor } from "./Cursor";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { throttle } from "lodash";

export function Dashboard() {
  // const [{ cursor, name, color }, updateMyPresence] = useMyPresence();
  const [{ name, color }, updateMyPresence] = useMyPresence();
  const others = useOthers();

  // Throttle cursor updates
  useEffect(() => {
    const throttledUpdateCursor = throttle((x: number, y: number) => {
      updateMyPresence({
        cursor: {
          x,
          y,
        },
      });
    }, 50); // Update every 50ms instead of every frame

    const handlePointerMove = (event: PointerEvent) => {
      throttledUpdateCursor(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      updateMyPresence({
        cursor: null,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      throttledUpdateCursor.cancel();
    };
  }, [updateMyPresence]);

  // Handle share button click
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  // Add state for interactive components
  const [todoCount, setTodoCount] = useState(0);
  const [weather, setWeather] = useState("☀️");
  const [votes, setVotes] = useState({ thumbsUp: 0, thumbsDown: 0 });

  return (
    <div className="relative min-h-screen bg-background p-8">
      {/* Header with share button and current user */}
      <div className="fixed right-4 top-4 flex items-center gap-4 z-50">
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: color }}
        >
          {name?.[0]?.toUpperCase()}
        </div>
      </div>

      {/* Main dashboard content */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Collaborative Dashboard</h1>
        <p className="text-muted-foreground">
          Move your cursor around and interact with the dashboard components in
          real-time!
        </p>

        {/* Interactive dashboard components */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Todo Counter Card */}
          <div className="rounded-lg border p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Todo Counter</h2>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setTodoCount((prev) => Math.max(0, prev - 1))}
              >
                -
              </Button>
              <span className="text-2xl font-bold">{todoCount}</span>
              <Button onClick={() => setTodoCount((prev) => prev + 1)}>
                +
              </Button>
            </div>
          </div>

          {/* Weather Toggle Card */}
          <div className="rounded-lg border p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Weather Toggle</h2>
            <div className="flex items-center gap-4">
              <span className="text-4xl">{weather}</span>
              <Button
                onClick={() =>
                  setWeather((prev) => (prev === "☀️" ? "🌧️" : "☀️"))
                }
              >
                Toggle Weather
              </Button>
            </div>
          </div>

          {/* Voting Card */}
          <div className="rounded-lg border p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Quick Poll</h2>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() =>
                  setVotes((prev) => ({ ...prev, thumbsUp: prev.thumbsUp + 1 }))
                }
              >
                👍 {votes.thumbsUp}
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setVotes((prev) => ({
                    ...prev,
                    thumbsDown: prev.thumbsDown + 1,
                  }))
                }
              >
                👎 {votes.thumbsDown}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Other users' cursors */}
      {others.map(({ presence, connectionId }) => {
        if (presence.cursor === null) return null;

        return (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
            name={presence.name}
            color={presence.color}
          />
        );
      })}
    </div>
  );
}
