"use client";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { UserMapType } from "./BasicForm";

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  setValue: UseFormSetValue<UserMapType>;
  defaultValue?: string;
}
const PlaceAutocomplete = ({
  onPlaceSelect,
  setValue,
  defaultValue,
}: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address", "address_components"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        onBlur={() => {
          console.log("onBlur ...");
          setValue("address", "");
        }}
        className="w-full p-1 border"
        defaultValue={defaultValue}
      />
    </div>
  );
};

export const GoogleMapsLoader = ({
  setValue,
  defaultValue,
}: {
  setValue: UseFormSetValue<UserMapType>;
  defaultValue?: string;
}) => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>();

  useEffect(() => {
    if (selectedPlace?.formatted_address) {
      console.log("setting value ...");
      setValue("address", selectedPlace.formatted_address, {
        shouldValidate: true,
      });
    }
  }, [selectedPlace]);

  return (
    <APIProvider
      apiKey={"AIzaSyD56xdTaNKwLdDvnIcPsDNZ9McVA1Wg5Bo"}
      solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
    >
      <PlaceAutocomplete onPlaceSelect={setSelectedPlace} setValue={setValue} />
    </APIProvider>
  );
};
