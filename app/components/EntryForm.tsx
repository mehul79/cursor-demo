import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EntryFormProps {
  onJoin: (name: string) => void;
}

export function EntryForm({ onJoin }: EntryFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onJoin(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Enter your name</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Join Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
