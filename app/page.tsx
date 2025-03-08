"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RoomProvider } from "./liveblocks.config";
import { Dashboard } from "./components/Dashboard";
import { EntryForm } from "./components/EntryForm";
import { generateRandomColor } from "./utils/colors";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");

  // Get roomId from URL or generate a new one
  const roomId = searchParams.get("room") || "default-room";

  const handleJoin = (userName: string) => {
    setName(userName);
    // Add room to URL if not present
    if (!searchParams.get("room")) {
      router.push(`/?room=${roomId}`);
    }
  };

  if (!name) {
    return <EntryForm onJoin={handleJoin} />;
  }

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        name: name,
        color: generateRandomColor(),
      }}
    >
      <Dashboard />
    </RoomProvider>
  );
}
