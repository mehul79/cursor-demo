import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey:
    "pk_dev_OXtP8Dlw57TZjwRqZGBy0PiHnicGis7VBlWySaDe8KCPPQpMn-qbOyW-x-_VTIOl", // Replace with your Liveblocks public key
});

// Presence represents the current user's presence in the room
type Presence = {
  cursor: { x: number; y: number } | null;
  name: string;
  color: string;
};

// Storage represents the shared document that persists in the room
type Storage = Record<string, never>;

// User meta data that is only available on the server
type UserMeta = {
  id: string;
  info: {
    name: string;
    color: string;
  };
};

// Optionally, custom events
type RoomEvent = Record<string, never>;

export const {
  RoomProvider,
  useRoom,
  useMyPresence,
  useUpdateMyPresence,
  useSelf,
  useOthers,
  useOthersMapped,
  useOthersConnectionIds,
  useOther,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
