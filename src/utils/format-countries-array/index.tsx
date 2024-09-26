export const formatCountriesArray = (countries: any) => {
    return countries.map((country: any) => {
        return {
        value: country.isoAlpha2,
        label: country.name,
        };
    });
}