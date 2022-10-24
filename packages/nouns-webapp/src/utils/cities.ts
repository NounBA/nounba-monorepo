import { REGIONS } from '../config';

export const west = [
  { id: 1, displayName: 'Dev 1', tokenIndex: 1 },
  { id: 2, displayName: 'Houston', tokenIndex: 2 },
  { id: 3, displayName: 'Oklahoma City', tokenIndex: 3 },
  { id: 5, displayName: 'Portland', tokenIndex: 4 },
  { id: 7, displayName: 'Sacramento', tokenIndex: 5 },
  { id: 9, displayName: 'Los Angeles', tokenIndex: 6 },
  { id: 11, displayName: 'Spurs', tokenIndex: 7 },
  { id: 13, displayName: 'Dev 3', tokenIndex: 8 },
  { id: 15, displayName: 'LA', tokenIndex: 9 },
  { id: 17, displayName: 'New Orleans', tokenIndex: 10 },
  { id: 19, displayName: 'Minnesota', tokenIndex: 11 },
  { id: 21, displayName: 'All Star 1', tokenIndex: 12 },
  { id: 23, displayName: 'All Star 3', tokenIndex: 13 },
  { id: 25, displayName: 'Denver', tokenIndex: 14 },
  { id: 27, displayName: 'Dev 5', tokenIndex: 15 },
  { id: 29, displayName: 'Utah', tokenIndex: 16 },
  { id: 31, displayName: 'Phoenix', tokenIndex: 17 },
  { id: 33, displayName: 'Memphis', tokenIndex: 18 },
  { id: 35, displayName: 'Dallas', tokenIndex: 19 },
  { id: 37, displayName: 'The Bay', tokenIndex: 20 },
];
export const east = [
  { id: 2, displayName: 'Dev 2', tokenIndex: 21 },
  { id: 4, displayName: 'Orlando', tokenIndex: 22 },
  { id: 6, displayName: 'Detroit', tokenIndex: 23 },
  { id: 8, displayName: 'Indiana', tokenIndex: 24 },
  { id: 10, displayName: 'Washington', tokenIndex: 25 },
  { id: 12, displayName: 'New York', tokenIndex: 26 },
  { id: 14, displayName: 'Charlotte', tokenIndex: 27 },
  { id: 16, displayName: 'Dev 4', tokenIndex: 28 },
  { id: 18, displayName: 'Cleveland', tokenIndex: 29 },
  { id: 20, displayName: 'Atlanta', tokenIndex: 30 },
  { id: 22, displayName: 'Brooklyn', tokenIndex: 31 },
  { id: 24, displayName: 'All Star 2', tokenIndex: 32 },
  { id: 26, displayName: 'All Star 4', tokenIndex: 33 },
  { id: 28, displayName: 'Chicago', tokenIndex: 34 },
  { id: 30, displayName: 'Dev 6', tokenIndex: 35 },
  { id: 32, displayName: 'Toronto', tokenIndex: 36 },
  { id: 34, displayName: 'Philadelphia', tokenIndex: 37 },
  { id: 36, displayName: 'Milwaukee', tokenIndex: 38 },
  { id: 38, displayName: 'Miami', tokenIndex: 39 },
  { id: 40, displayName: 'Boston', tokenIndex: 40 },
];

export const cities = { [REGIONS.east]: east, [REGIONS.west]: west };

const listById = (cities: { tokenIndex: number; displayName: string }[]) =>
  cities.reduce((prev, city) => ({ ...prev, [city.tokenIndex]: city }), {});

export const allCities: { [n: number]: { tokenIndex: number; displayName: string } } = {
  ...listById(west),
  ...listById(east),
};

export const getSide = (tokenIndex: number) => (tokenIndex < 21 ? REGIONS.west : REGIONS.east);

export default cities;
