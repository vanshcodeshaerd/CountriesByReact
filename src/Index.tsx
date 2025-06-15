import { useState, useMemo } from 'react';
import { useCountries } from '@/hooks/useCountries';
import { Country, SortField, SortOrder } from 'src/types/country';
import CountryCard from '@/components/ui/CountryCard';
import CountryModal from '@/components/ui/CountryModal';
import SearchAndSort from '@/components/ui/SearchAndSort';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Flag } from 'lucide-react';

const Index = () => {
  const { data: countries = [], isLoading, error, isError } = useCountries();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSortFieldChange = (value: string) => {
    setSortField(value as SortField);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value as SortOrder);
  };

  const filteredAndSortedCountries = useMemo(() => {
    if (!Array.isArray(countries)) return [];

    console.log(`Filtering ${countries.length} countries with search term: "${searchTerm}"`);
    
    const filtered = countries.filter((country: Country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(`After filtering: ${filtered.length} countries`);
    console.log(`Sorting by ${sortField} in ${sortOrder} order`);

    filtered.sort((a: Country, b: Country) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortField === 'name') {
        aValue = a.name.common.toLowerCase();
        bValue = b.name.common.toLowerCase();
      } else {
        aValue = a.population;
        bValue = b.population;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [countries, searchTerm, sortField, sortOrder]);

  const handleCountryClick = (country: Country) => {
    console.log(`Opening modal for country: ${country.name}`);
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    console.log('Closing country modal');
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  if (isError) {
    console.error('Error in Index component:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-4">
        <div className="container mx-auto max-w-7xl">
          <Alert variant="destructive" className="max-w-md mx-auto mt-8">
            <AlertDescription>
              {error instanceof Error 
                ? `Failed to load countries: ${error.message}`
                : 'Failed to load countries. Please check your internet connection and try again.'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center py-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Flag className="h-8 w-8 text-primary animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Countries Explorer
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(countries) || countries.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-4">
        <div className="container mx-auto max-w-7xl">
          <Alert className="max-w-md mx-auto mt-8">
            <AlertDescription>
              No countries data available. Please try refreshing the page.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <div className="container mx-auto max-w-7xl p-4">
        {/* Header */}
        <div className="text-center py-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flag className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Countries Explorer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover countries around the world. Search, sort, and explore detailed information about any nation.
          </p>
        </div>

        {/* Search and Sort Controls */}
        <SearchAndSort
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortFieldChange={handleSortFieldChange}
          onSortOrderChange={handleSortOrderChange}
        />

        {/* Results Summary */}
        {!isLoading && countries && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAndSortedCountries.length} of {countries.length} countries
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Countries Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCountries.map((country: Country) => (
              <CountryCard
                key={country.name.common}
                country={country}
                onClick={() => handleCountryClick(country)}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredAndSortedCountries.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No countries found matching "{searchTerm}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search term
            </p>
          </div>
        )}

        {/* Country Details Modal */}
        <CountryModal
          country={selectedCountry}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </div>
    </div>
  );
};

export default Index;