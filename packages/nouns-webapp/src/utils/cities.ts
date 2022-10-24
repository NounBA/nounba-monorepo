import { REGIONS } from '../config';

export const west = [
  { id: 1, displayName: 'Dev 1', tokenIndex: 0 },
  { id: 2, displayName: 'Houston', tokenIndex: 1 },
  { id: 3, displayName: 'Oklahoma City', tokenIndex: 2 },
  { id: 5, displayName: 'Portland', tokenIndex: 3 },
  { id: 7, displayName: 'Sacramento', tokenIndex: 4 },
  { id: 9, displayName: 'Los Angeles', tokenIndex: 5 },
  { id: 11, displayName: 'Dev 1', tokenIndex: 6 },
  { id: 13, displayName: 'Special', tokenIndex: 7 },
  { id: 15, displayName: 'Spurs', tokenIndex: 8 },
  { id: 17, displayName: 'LA', tokenIndex: 9 },
  { id: 19, displayName: 'New Orleans', tokenIndex: 10 },
  { id: 21, displayName: 'Minnesota', tokenIndex: 11 },
  { id: 23, displayName: 'Dev 2', tokenIndex: 12 },
  { id: 25, displayName: 'Denver', tokenIndex: 13 },
  { id: 27, displayName: 'All-Star', tokenIndex: 14 },
  { id: 29, displayName: 'Utah', tokenIndex: 15 },
  { id: 31, displayName: 'Phoenix', tokenIndex: 16 },
  { id: 33, displayName: 'Memphis', tokenIndex: 17 },
  { id: 35, displayName: 'Dev 3', tokenIndex: 18 },
  { id: 37, displayName: 'Dallas', tokenIndex: 19 },
  { id: 39, displayName: 'Golden State', tokenIndex: 20 },
];
export const east = [
  { id: 2, displayName: 'Orlando', tokenIndex: 21 },
  { id: 4, displayName: 'Detroit', tokenIndex: 22 },
  { id: 6, displayName: 'Indiana', tokenIndex: 23 },
  { id: 8, displayName: 'Washington', tokenIndex: 24 },
  { id: 10, displayName: 'New York', tokenIndex: 25 },
  { id: 12, displayName: 'Dev 4', tokenIndex: 26 },
  { id: 14, displayName: 'Special', tokenIndex: 27 },
  { id: 16, displayName: 'Charlotte', tokenIndex: 28 },
  { id: 18, displayName: 'Cleveland', tokenIndex: 29 },
  { id: 20, displayName: 'Atlanta', tokenIndex: 30 },
  { id: 22, displayName: 'Brooklyn', tokenIndex: 31 },
  { id: 24, displayName: 'Dev 5', tokenIndex: 32 },
  { id: 26, displayName: 'Chicago', tokenIndex: 33 },
  { id: 28, displayName: 'All-Star', tokenIndex: 34 },
  { id: 30, displayName: 'Toronto', tokenIndex: 35 },
  { id: 32, displayName: 'Philadelphia', tokenIndex: 36 },
  { id: 34, displayName: 'Milwaukee', tokenIndex: 37 },
  { id: 36, displayName: 'Dev 6', tokenIndex: 38 },
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
