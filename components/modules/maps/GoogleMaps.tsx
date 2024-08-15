"use client";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { UserMapType } from "./BasicForm";

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: string | undefined) => void;
  defaultValue?: string;
  setValue: UseFormSetValue<UserMapType>;
}
const PlaceAutocomplete = ({
  onPlaceSelect,
  defaultValue,
  setValue,
}: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) {
      return;
    }
    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace().formatted_address);
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <input
      ref={inputRef}
      className="w-full p-1 border"
      onBlur={(_) => {
        setValue("address", "");
      }}
      defaultValue={defaultValue}
    />
  );
};

export const GoogleMapsLoader = ({
  setValue,
  defaultValue,
}: {
  setValue: UseFormSetValue<UserMapType>;
  defaultValue?: string;
}) => {
  const [selectedPlace, setSelectedPlace] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (selectedPlace) {
      setValue("address", selectedPlace, { shouldValidate: true });
    }
  }, [selectedPlace]);

  return (
    <APIProvider
      apiKey={"AIzaSyD56xdTaNKwLdDvnIcPsDNZ9McVA1Wg5Bo"}
      solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
    >
      <PlaceAutocomplete
        onPlaceSelect={setSelectedPlace}
        defaultValue={defaultValue}
        setValue={setValue}
      />
    </APIProvider>
  );
};
