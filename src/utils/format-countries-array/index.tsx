export const formatCountriesArray = (countries: any) => {
    const availableCountries = process.env.NEXT_PUBLIC_AVALAIBLE_COUNTRIES?.split("|").map(code => code.trim());

    return countries
        ?.filter((country: any) => availableCountries?.includes(country?.isoAlpha2))
        ?.map((country: any) => ({
            code: country?.isoAlpha2,
            name: country?.name,
        }));
};
