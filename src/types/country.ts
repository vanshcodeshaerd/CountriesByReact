export type SortField = 'name' | 'population';
export type SortOrder = 'asc' | 'desc';

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  region: string;
  latlng: [number, number];
  population: number;
  timezones: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  capital: string[];
}

// Helper function to get the first native name
export const getNativeName = (country: Country): string => {
  const nativeNames = Object.values(country.name.nativeName);
  return nativeNames[0]?.common || country.name.common;
};

// Helper function to get the first currency
export const getFirstCurrency = (country: Country): { name: string; symbol: string } | null => {
  const currencies = Object.values(country.currencies);
  return currencies[0] || null;
};