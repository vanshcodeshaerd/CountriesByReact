import { Country, getNativeName, getFirstCurrency } from '@/types/country';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CountryModalProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
}

const CountryModal = ({ country, isOpen, onClose }: CountryModalProps) => {
  if (!country) return null;

  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat('en-US').format(population);
  };

  const nativeName = getNativeName(country);
  const currency = getFirstCurrency(country);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center space-x-4">
            <img
              src={country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-20 h-15 object-cover rounded-lg shadow-md border border-border/20"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground">
                {country.name.common}
              </DialogTitle>
              <p className="text-lg text-muted-foreground">
                {nativeName}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="px-6 pb-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Capital:</span>
                  <p className="text-foreground">{country.capital?.[0] || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Region:</span>
                  <p className="text-foreground">{country.region}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Population:</span>
                  <p className="text-foreground">{formatPopulation(country.population)}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Coordinates:</span>
                  <p className="text-foreground">{country.latlng.join(', ')}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Currencies */}
            {currency && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Currency</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    {currency.name} {currency.symbol}
                  </Badge>
                </div>
              </div>
            )}

            {/* Timezones */}
            {country.timezones && country.timezones.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Timezones</h3>
                <div className="flex flex-wrap gap-2">
                  {country.timezones.map((timezone, index) => (
                    <Badge key={index} variant="outline" className="font-mono text-xs">
                      {timezone}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CountryModal; 