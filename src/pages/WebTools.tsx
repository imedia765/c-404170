import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface WebsiteReport {
  metric: string;
  value: string;
}

interface WebsiteError {
  type: string;
  description: string;
  severity: "high" | "medium" | "low";
}

export default function WebTools() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState<WebsiteReport[]>([]);
  const [errors, setErrors] = useState<WebsiteError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const analyzeWebsite = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // This is a mock analysis - in a real app, you'd call an API
      const mockReport: WebsiteReport[] = [
        { metric: "Page Load Time", value: "2.3s" },
        { metric: "Performance Score", value: "87/100" },
        { metric: "SEO Score", value: "92/100" },
        { metric: "Accessibility Score", value: "95/100" },
      ];

      const mockErrors: WebsiteError[] = [
        {
          type: "Performance",
          description: "Large images not optimized",
          severity: "medium",
        },
        {
          type: "Accessibility",
          description: "Missing alt tags on images",
          severity: "high",
        },
      ];

      setReport(mockReport);
      setErrors(mockErrors);
      toast({
        title: "Success",
        description: "Website analysis completed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze website",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1">
        <div className="container mx-auto p-6 space-y-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Web Development Tools</h1>
            <SidebarTrigger />
          </div>
          
          <div className="flex gap-4">
            <Input
              type="url"
              placeholder="Enter website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="max-w-xl"
            />
            <Button onClick={analyzeWebsite} disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Analyze Website"}
            </Button>
          </div>

          {report.length > 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Website Analysis Report</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.map((item) => (
                      <TableRow key={item.metric}>
                        <TableCell className="font-medium">{item.metric}</TableCell>
                        <TableCell>{item.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Issues Found</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Severity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {errors.map((error, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{error.type}</TableCell>
                        <TableCell>{error.description}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              error.severity === "high"
                                ? "bg-red-100 text-red-800"
                                : error.severity === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {error.severity}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}