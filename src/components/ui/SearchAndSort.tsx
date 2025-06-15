import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SortField, SortOrder } from '@/types/country';
import { Search } from 'lucide-react';

interface SearchAndSortProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortFieldChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

const SearchAndSort = ({
  searchTerm,
  onSearchChange,
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
}: SearchAndSortProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search countries by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/50 backdrop-blur-sm border-border/50"
        />
      </div>
      
      <div className="flex gap-2">
        <Select value={sortField} onValueChange={(value: string) => onSortFieldChange(value as SortField)}>
          <SelectTrigger className="w-40 bg-background/50 backdrop-blur-sm border-border/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Country Name</SelectItem>
            <SelectItem value="population">Population</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={sortOrder} onValueChange={(value: string) => onSortOrderChange(value as SortOrder)}>
          <SelectTrigger className="w-32 bg-background/50 backdrop-blur-sm border-border/50">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchAndSort;