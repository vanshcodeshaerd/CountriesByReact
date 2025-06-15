import { Country } from 'src/types/country';
import { Card, CardContent } from '@/components/ui/card';

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

const CountryCard = ({ country, onClick }: CountryCardProps) => {
  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat('en-US').format(population);
  };

  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50 group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              src={country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-16 h-12 object-cover rounded-md shadow-sm border border-border/20"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {country.name.common}
            </h3>
            <p className="text-sm text-muted-foreground">
              Capital: {country.capital?.[0] || 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground">
              Population: {formatPopulation(country.population)}
            </p>
            <p className="text-sm text-muted-foreground">
              Region: {country.region}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
