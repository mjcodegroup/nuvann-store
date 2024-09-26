export const formatCountriesArray = (countries: any) => {
    return countries.map((country: any) => {
        return {
        code: country.isoAlpha2,
        name: country.name,
        };
    });
}