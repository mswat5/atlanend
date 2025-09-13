import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <div className="relative animate-slide-in">
      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
        <Input
          placeholder="Search activities, tags, or descriptions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-12 sm:h-14 text-sm sm:text-lg glass-effect border-white/20 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery("")}
            className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-gray-100 button-hover"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
