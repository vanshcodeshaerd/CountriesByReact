import { Country } from '@/types/country';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from 'src/components/ui/scroll-area';

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

  const formatArea = (area: number) => {
    return area ? new Intl.NumberFormat('en-US').format(area) + ' km²' : 'N/A';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center space-x-4">
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              className="w-20 h-15 object-cover rounded-lg shadow-md border border-border/20"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground">
                {country.name}
              </DialogTitle>
              <p className="text-lg text-muted-foreground">
                {country.nativeName}
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
                  <p className="text-foreground">{country.capital || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Region:</span>
                  <p className="text-foreground">{country.region}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Subregion:</span>
                  <p className="text-foreground">{country.subregion || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Population:</span>
                  <p className="text-foreground">{formatPopulation(country.population)}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Area:</span>
                  <p className="text-foreground">{formatArea(country.area)}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Demonym:</span>
                  <p className="text-foreground">{country.demonym || 'N/A'}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Codes and Identifiers */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Codes & Identifiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Alpha2 Code:</span>
                  <p className="text-foreground font-mono">{country.alpha2Code}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Alpha3 Code:</span>
                  <p className="text-foreground font-mono">{country.alpha3Code}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Calling Codes:</span>
                  <p className="text-foreground">+{country.callingCodes.join(', +')}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Top Level Domain:</span>
                  <p className="text-foreground font-mono">{country.topLevelDomain.join(', ')}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Languages */}
            {country.languages && country.languages.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {country.languages.map((language, index) => (
                    <Badge key={index} variant="secondary">
                      {language.name} ({language.nativeName})
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Currencies */}
            {country.currencies && country.currencies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Currencies</h3>
                <div className="flex flex-wrap gap-2">
                  {country.currencies.map((currency, index) => (
                    <Badge key={index} variant="outline">
                      {currency.name} ({currency.code}) {currency.symbol}
                    </Badge>
                  ))}
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

            {/* Borders */}
            {country.borders && country.borders.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Border Countries</h3>
                <div className="flex flex-wrap gap-2">
                  {country.borders.map((border, index) => (
                    <Badge key={index} variant="secondary">
                      {border}
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
