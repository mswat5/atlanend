import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  Upload,
  Trash2,
  Share2,
  Copy,
  FileText,
  Calendar,
} from "lucide-react";

export function ScheduleActions() {
  const {
    schedule,
    exportSchedule,
    clearSchedule,
    currentTheme,
    saveToLocalStorage,
  } = useStore();
  const { toast } = useToast();
  const [exportData, setExportData] = useState("");
  const [isExportOpen, setIsExportOpen] = useState(false);

  const hasActivities =
    schedule.saturday.length > 0 || schedule.sunday.length > 0;

  const handleExport = () => {
    const data = exportSchedule();
    setExportData(data);
    setIsExportOpen(true);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exportData);
      toast({
        title: "Copied to clipboard!",
        description: "Your schedule has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard. Please copy manually.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([exportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `atlanend-schedule-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Schedule downloaded!",
      description: "Your weekend schedule has been saved to your device.",
    });
  };

  const handleClear = () => {
    clearSchedule();
    toast({
      title: "Schedule cleared",
      description: "Your weekend schedule has been cleared.",
    });
  };

  const generateShareableText = () => {
    const saturdayActivities = schedule.saturday
      .map((a) => `• ${a.title}`)
      .join("\n");
    const sundayActivities = schedule.sunday
      .map((a) => `• ${a.title}`)
      .join("\n");

    return `🌟 My Weekend Plan (${currentTheme} theme)\n\n📅 Saturday:\n${
      saturdayActivities || "• No activities planned"
    }\n\n📅 Sunday:\n${
      sundayActivities || "• No activities planned"
    }\n\nPlanned with atlanend 🎯`;
  };

  const handleShare = async () => {
    const shareText = generateShareableText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Weekend Plan",
          text: shareText,
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Copied to clipboard!",
          description:
            "Your schedule has been copied to clipboard for sharing.",
        });
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Your schedule has been copied to clipboard for sharing.",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant="outline"
        onClick={handleExport}
        disabled={!hasActivities}
        className="flex items-center space-x-2"
      >
        <FileText className="w-4 h-4" />
        <span>Export</span>
      </Button>

      <Button
        variant="outline"
        onClick={handleShare}
        disabled={!hasActivities}
        className="flex items-center space-x-2"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </Button>

      <Button
        variant="outline"
        onClick={handleClear}
        disabled={!hasActivities}
        className="flex items-center space-x-2 text-red-600 hover:text-red-700"
      >
        <Trash2 className="w-4 h-4" />
        <span>Clear</span>
      </Button>

      <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Export Weekend Schedule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={exportData}
              readOnly
              className="min-h-[300px] font-mono text-sm"
              placeholder="Export data will appear here..."
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCopyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
