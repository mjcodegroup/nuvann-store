import { useCountries } from "@/contexts/countries";
import { nuvannApi, nuvannPublicApi } from "@/services/api";
import { useEffect } from "react";

export function useCountriesInfo() {
  const { state: countriesState, dispatch: countriesDispatch } = useCountries();

  async function getCountries() {
    countriesDispatch({ type: "SET_LOADING", value: true });
    
    const storedCountries = sessionStorage.getItem("countries");
    if (storedCountries) {
      countriesDispatch({ type: "SET_COUNTRIES", value: JSON.parse(storedCountries) });
      countriesDispatch({ type: "SET_LOADING", value: false });
      return;
    }

    try {
      const response = await nuvannPublicApi.get("/countries");
      countriesDispatch({ type: "SET_COUNTRIES", value: response.data });

      sessionStorage.setItem("countries", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      countriesDispatch({ type: "SET_LOADING", value: false });
    }
  }

  useEffect(() => {
    getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    countries: countriesState.countries,
    loading: countriesState.isLoading,
    getCountries,
  };
}
