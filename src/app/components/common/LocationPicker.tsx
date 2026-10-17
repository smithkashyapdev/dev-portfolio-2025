'use client';
import React, { useMemo, useState } from 'react';
import { Country, State, City } from 'country-state-city';

export type PickedCity = {
  place: string; // "City, State, Country"
  lat: number;
  lon: number;
};

type Props = {
  onSelect: (city: PickedCity | null) => void;
};

const fieldStyle: React.CSSProperties = {
  background: 'var(--surface-muted)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
};

/**
 * Cascading Country -> State -> City picker.
 * The City field autosuggests after 3+ characters and returns exact lat/long
 * so the astrology engine can use precise birth coordinates.
 */
export function LocationPicker({ onSelect }: Props) {
  const [countryCode, setCountryCode] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [chosen, setChosen] = useState<PickedCity | null>(null);

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () => (countryCode ? State.getStatesOfCountry(countryCode) : []),
    [countryCode],
  );
  const cities = useMemo(
    () =>
      countryCode && stateCode ? City.getCitiesOfState(countryCode, stateCode) : [],
    [countryCode, stateCode],
  );

  const suggestions = useMemo(() => {
    if (cityQuery.trim().length < 3) return [];
    const q = cityQuery.trim().toLowerCase();
    return cities.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 8);
  }, [cities, cityQuery]);

  const countryName = (code: string) => countries.find((c) => c.isoCode === code)?.name ?? code;
  const stateName = (code: string) =>
    states.find((s) => s.isoCode === code)?.name ?? code;

  const choose = (cityName: string, lat: string, lon: string) => {
    const picked: PickedCity = {
      place: `${cityName}, ${stateName(stateCode)}, ${countryName(countryCode)}`,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    };
    setChosen(picked);
    setCityQuery(cityName);
    onSelect(picked);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Country */}
      <div>
        <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
          Country
        </label>
        <select
          required
          value={countryCode}
          onChange={(e) => {
            setCountryCode(e.target.value);
            setStateCode('');
            setCityQuery('');
            setChosen(null);
            onSelect(null);
          }}
          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
          style={fieldStyle}
        >
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c.isoCode} value={c.isoCode}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      <div>
        <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
          State / Region
        </label>
        <select
          required
          disabled={!countryCode}
          value={stateCode}
          onChange={(e) => {
            setStateCode(e.target.value);
            setCityQuery('');
            setChosen(null);
            onSelect(null);
          }}
          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none disabled:opacity-50"
          style={fieldStyle}
        >
          <option value="">{countryCode ? 'Select state' : 'Select country first'}</option>
          {states.map((s) => (
            <option key={s.isoCode} value={s.isoCode}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* City autosuggest */}
      <div className="relative">
        <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
          City {stateCode && <span className="opacity-60">(type 3+ letters)</span>}
        </label>
        <input
          required
          disabled={!stateCode}
          value={cityQuery}
          onChange={(e) => {
            setCityQuery(e.target.value);
            setChosen(null);
            onSelect(null);
          }}
          placeholder={stateCode ? 'Start typing your city…' : 'Select state first'}
          autoComplete="off"
          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none disabled:opacity-50"
          style={fieldStyle}
        />

        {suggestions.length > 0 && !chosen && (
          <ul
            className="absolute z-30 mt-1 max-h-52 w-full overflow-y-auto rounded-xl p-1 shadow-xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {suggestions.map((c, i) => (
              <li key={`${c.name}-${i}`}>
                <button
                  type="button"
                  onClick={() => choose(c.name, c.latitude ?? '0', c.longitude ?? '0')}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-500 hover:text-white"
                >
                  {c.name}
                  <span className="ml-1 text-xs opacity-60">· {stateName(stateCode)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {cityQuery.trim().length >= 3 && suggestions.length === 0 && !chosen && (
          <p className="mt-1 text-[11px]" style={{ color: 'var(--text-muted)' }}>
            No match — pick the nearest larger city.
          </p>
        )}

        {chosen && (
          <p className="mt-1 text-[11px] text-emerald-500">
            ✓ {chosen.place}
          </p>
        )}
      </div>
    </div>
  );
}
