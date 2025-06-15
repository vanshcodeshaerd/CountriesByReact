import { useQuery } from '@tanstack/react-query';
import { Country } from 'src/types/country';

const fetchCountries = async (): Promise<Country[]> => {
  try {
    console.log('Fetching countries from API...');
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,nativeName,region,latlng,flags,timezones,population,postalCodes,currencies,capital');
    
    if (!response.ok) {
      console.error('API Response not OK:', response.status, response.statusText);
      throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Raw API response:', data.slice(0, 1)); // Log first country as sample
    
    if (!Array.isArray(data)) {
      console.error('Invalid API response type:', typeof data);
      throw new Error('Invalid API response: expected an array of countries');
    }

    // Validate the data structure
    const validCountries = data.filter((country, index): country is Country => {
      const isValid = (
        typeof country === 'object' &&
        country !== null &&
        typeof country.name === 'object' &&
        typeof country.name.common === 'string' &&
        typeof country.name.official === 'string' &&
        typeof country.flags === 'object' &&
        typeof country.flags.png === 'string' &&
        typeof country.region === 'string' &&
        Array.isArray(country.latlng) &&
        typeof country.population === 'number' &&
        Array.isArray(country.timezones) &&
        typeof country.currencies === 'object' &&
        Array.isArray(country.capital)
      );

      if (!isValid) {
        console.error('Invalid country data at index', index, ':', country);
      }

      return isValid;
    });

    if (validCountries.length === 0) {
      console.error('No valid countries found in response. Total items:', data.length);
      throw new Error('No valid countries found in the API response');
    }

    console.log(`Successfully processed ${validCountries.length} countries`);
    return validCountries;
  } catch (error) {
    console.error('Error in fetchCountries:', error);
    throw error;
  }
};

export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1, // Only retry once on failure
  });
};