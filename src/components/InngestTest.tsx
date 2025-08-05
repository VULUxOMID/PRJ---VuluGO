"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InngestTest() {
  const [name, setName] = useState("World");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const triggerHelloWorld = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch("/api/inngest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "test/hello.world",
          data: { name },
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setResult(`Job triggered! Check the Inngest dashboard at http://localhost:8288`);
      } else {
        setResult("Error triggering job");
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const triggerUserDataProcess = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch("/api/inngest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "user/data.process",
          data: { 
            userId: "user-123", 
            data: { message: "Test data", timestamp: new Date().toISOString() } 
          },
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setResult(`User data processing job triggered! Check the Inngest dashboard at http://localhost:8288`);
      } else {
        setResult("Error triggering job");
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Inngest Background Jobs Test</CardTitle>
        <CardDescription>
          Test background functions and verify them in the Inngest dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name for Hello World</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
          />
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={triggerHelloWorld} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Triggering..." : "Trigger Hello World Job"}
          </Button>
          
          <Button 
            onClick={triggerUserDataProcess} 
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            {loading ? "Triggering..." : "Trigger User Data Processing"}
          </Button>
        </div>
        
        {result && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm">{result}</p>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          <p>Dashboard: <a href="http://localhost:8288" target="_blank" rel="noopener noreferrer" className="underline">http://localhost:8288</a></p>
        </div>
      </CardContent>
    </Card>
  );
} 