"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Journals/ui/popover";
import { Checkbox } from "@/components/Journals/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/Journals/ui/separator";
import { Search, Filter, BookOpen, Sparkles, Loader2, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import SubmitJournalDialog from "@/components/Journals/submit-journal-dialog";
import { fetchJournals, fetchRecommendedJournals } from "@/components/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import AISuggestedFilters from "./ai-features/ai-suggested-filters";
import JournalList from "./journal-list";
import { Journal } from "@/data/journalData";

interface Filter {
  id: string;
  category: string;
  value: string;
  label?: string;
}

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterCategory {
  category: string;
  options: FilterOption[];
}

interface JournalSearchProps {
  initialQuery?: string;
  searchType?: string;
  showFilters?: boolean;
  onAISearchClick?: () => void;
}

export default function AdvancedSearchBar({
  initialQuery = "",
  searchType = "keyword",
  showFilters = false,
  onAISearchClick,
}: JournalSearchProps) {
  const [searchTypeState, setSearchTypeState] = useState(searchType);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [recommendedJournals, setRecommendedJournals] = useState<Journal[]>([]);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterCategory[]>([]);
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const loadRecommendedJournals = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRecommendedJournals(currentPage, itemsPerPage);
        setRecommendedJournals(data.results);
        setTotalResults(data.total);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } catch (error) {
        console.error("Failed to fetch recommended journals:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadRecommendedJournals();
  }, [currentPage]);

  const fetchFilterOptions = async () => {
    setIsLoadingFilters(true);
    try {
      const allJournals: Array<Record<string, any>> = [];
      let page = 1;
      let hasMore = true;

      while (hasMore && page <= 20) {
        const response = await fetch(`https://backend.afrikajournals.org/journal_api/journals/search/?page=${page}&limit=100`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const journals = data.results || [];

        if (journals.length === 0) {
          hasMore = false;
        } else {
          allJournals.push(...journals);
          hasMore = !!data.next;
          page++;
        }
      }

      const makeMap = (keyFn: (j: Record<string, any>) => string | undefined) => {
        const map = new Map<string, number>();
        allJournals.forEach((j) => {
          const key = keyFn(j)?.trim();
          if (key) map.set(key, (map.get(key) || 0) + 1);
        });
        return map;
      };

      const toOptions = (map: Map<string, number>) =>
        Array.from(map.entries())
          .map(([key, count]) => ({
            value: key.toLowerCase().replace(/\s+/g, "-"),
            label: key,
            count,
          }))
          .sort((a, b) => b.count - a.count);

      setFilterOptions([
        { category: "country", options: toOptions(makeMap((j) => j.country?.country)) },
        { category: "language", options: toOptions(makeMap((j) => j.language?.language)) },
        { category: "thematic_area", options: toOptions(makeMap((j) => j.thematic_area?.thematic_area)) },
        { category: "platform", options: toOptions(makeMap((j) => j.platform?.platform)) },
      ]);
    } catch (error) {
      console.error("Failed to fetch filter options:", error);
      setFilterOptions([
        {
          category: "country",
          options: [
            { value: "nigeria", label: "Nigeria" },
            { value: "south-africa", label: "South Africa" },
            { value: "kenya", label: "Kenya" },
            { value: "ghana", label: "Ghana" },
            { value: "egypt", label: "Egypt" },
            { value: "ethiopia", label: "Ethiopia" },
          ],
        },
        {
          category: "language",
          options: [
            { value: "english", label: "English" },
            { value: "french", label: "French" },
            { value: "arabic", label: "Arabic" },
            { value: "swahili", label: "Swahili" },
            { value: "portuguese", label: "Portuguese" },
          ],
        },
        {
          category: "thematic_area",
          options: [
            { value: "medicine-and-health", label: "Medicine and Health" },
            { value: "engineering", label: "Engineering" },
            { value: "social-sciences", label: "Social Sciences" },
            { value: "agriculture", label: "Agriculture" },
            { value: "education", label: "Education" },
            { value: "economics", label: "Economics" },
          ],
        },
      ]);
    } finally {
      setIsLoadingFilters(false);
    }
  };

  useEffect(() => {
    if (isFilterPopoverOpen && filterOptions.length === 0) {
      fetchFilterOptions();
    }
  }, [isFilterPopoverOpen, filterOptions.length]);

  useEffect(() => {
    const searchJournals = async () => {
      setIsLoading(true);
      try {
        const data = await fetchJournals(
          debouncedSearchQuery,
          currentPage,
          itemsPerPage,
          activeFilters
        );
        setJournals(data.results);
        setTotalResults(data.total);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } catch (error) {
        console.error("Failed to fetch journals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!debouncedSearchQuery && activeFilters.length === 0) {
      setJournals(recommendedJournals);
    } else {
      searchJournals();
    }
  }, [debouncedSearchQuery, activeFilters, currentPage, recommendedJournals]);

  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategories((prev) => {
      const copy = new Set(prev);
      if (copy.has(category)) {
        copy.delete(category);
      } else {
        copy.add(category);
      }
      return copy;
    });
  };

  const getDisplayedOptions = (category: FilterCategory) => {
    const limit = category.category === "country" ? 8 : 5;
    return expandedCategories.has(category.category)
      ? category.options
      : category.options.slice(0, limit);
  };

  const isFilterSelected = (category: string, value: string) =>
    activeFilters.some((f) => f.category === category && f.value === value);

  const handleFilterOptionToggle = (category: string, option: FilterOption) => {
    const id = `${category}-${option.value}`;
    setActiveFilters((prev) =>
      prev.some((f) => f.id === id)
        ? prev.filter((f) => f.id !== id)
        : [...prev, { id, category, value: option.value, label: option.label }]
    );
  };

  const handleApplySuggestedFilter = (filter: { category: string; value: string; label?: string }) => {
    const id = `${filter.category}-${filter.value}`;
    if (!activeFilters.some((f) => f.id === id)) {
      setActiveFilters([...activeFilters, { id, category: filter.category, value: filter.value, label: filter.label }]);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col">
      <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  <h2 className="text-xl font-semibold">Find Academic Journals</h2>
  <Button
    variant="outline"
    size="sm"
    onClick={() => setShowSubmitDialog(true)}
    className="bg-primary/10 hover:bg-primary/20 text-primary w-full sm:w-auto"
  >
    <BookOpen className="h-4 w-4 mr-2" />
    Submit Journal
  </Button>
  <SubmitJournalDialog
    open={showSubmitDialog}
    onOpenChange={() => setShowSubmitDialog(!showSubmitDialog)}
  />
</div>

<div className="mt-4">
  <Tabs value={searchTypeState} className="w-full">
    <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
      <TabsTrigger value="keyword" className="text-xs sm:text-sm text-center whitespace-normal">
        Keywords / Title / Abstract / Discipline / Country
      </TabsTrigger>
    </TabsList>
  </Tabs>
</div>

            <div className="flex flex-wrap gap-2">
              <div className="relative flex-1">
                <Input
                  className="h-12 pl-10 min-w-40 rounded-md text-base"
                  placeholder="Search by keywords or journal title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="h-12" onClick={onAISearchClick}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Search
                </Button>
                <Popover open={isFilterPopoverOpen} onOpenChange={setIsFilterPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="h-12 w-12 relative">
                      <Filter className="h-4 w-4" />
                      {activeFilters.length > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex justify-center items-center" variant="destructive">
                          {activeFilters.length}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-0" align="end">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">Filters</h3>
                        {activeFilters.length > 0 && (
                          <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])} className="text-destructive">
                            Clear All
                          </Button>
                        )}
                      </div>
                      {activeFilters.length > 0 && (
                        <>
                          <h4 className="text-sm font-medium mb-2">Active Filters:</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {activeFilters.map((f) => (
                              <Badge key={f.id} variant="secondary" className="flex items-center gap-1">
                                {f.label || f.value}
                                <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => setActiveFilters(activeFilters.filter((af) => af.id !== f.id))} />
                              </Badge>
                            ))}
                          </div>
                          <Separator className="mb-4" />
                        </>
                      )}
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {isLoadingFilters ? (
                          <div className="flex justify-center items-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            Loading filters...
                          </div>
                        ) : (
                          filterOptions.map((cat) => (
                            <div key={cat.category} className="space-y-2">
                              <h4 className="font-medium text-sm capitalize">
                                {cat.category.replace(/[_-]/g, " ")}
                              </h4>
                              <div className="pl-2 space-y-2">
                                {getDisplayedOptions(cat).map((opt) => (
                                  <div key={opt.value} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`${cat.category}-${opt.value}`}
                                      checked={isFilterSelected(cat.category, opt.value)}
                                      onCheckedChange={() => handleFilterOptionToggle(cat.category, opt)}
                                    />
                                    <Label htmlFor={`${cat.category}-${opt.value}`} className="text-sm flex-1">
                                      {opt.label} {opt.count && <span className="text-muted-foreground ml-1">({opt.count})</span>}
                                    </Label>
                                  </div>
                                ))}
                                {cat.options.length > (cat.category === "country" ? 8 : 5) && (
                                  <Button variant="ghost" size="sm" onClick={() => toggleCategoryExpansion(cat.category)} className="text-xs text-muted-foreground">
                                    {expandedCategories.has(cat.category) ? "Show less" : `Show ${cat.options.length - (cat.category === "country" ? 8 : 5)} more`}
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <Button className="w-full" onClick={() => setIsFilterPopoverOpen(false)}>
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {showFilters && (
              <div className="mt-4 transition-all duration-300 ease-in-out">
                {debouncedSearchQuery ? (
                  <AISuggestedFilters
                    query={debouncedSearchQuery}
                    onApplyFilter={handleApplySuggestedFilter}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Start typing a search to see suggested filters.
                  </p>
                )}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">AI-Enhanced:</span> Our search uses machine learning to improve results based on your research interests.
            </p>
          </div>
        </CardContent>
      </Card>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div>
          <JournalList journals={journals} itemsPerPage={itemsPerPage} />
          <div className="flex justify-between items-center mt-4">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
