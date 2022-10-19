import { REGIONS } from '../config';

export const west = [
  { id: 1, displayName: 'Houston' },
  { id: 3, displayName: 'Portland' },
  { id: 5, displayName: 'Los Angeles' },
  { id: 7, displayName: 'Special' },
  { id: 9, displayName: 'LA' },
  { id: 11, displayName: 'Minnesota' },
  { id: 13, displayName: 'Denver' },
  { id: 15, displayName: 'Utah' },
  { id: 17, displayName: 'Memphis' },
  { id: 19, displayName: 'Dallas' },
  { id: 21, displayName: 'Orlando' },
  { id: 23, displayName: 'Indiana' },
  { id: 25, displayName: 'New York' },
  { id: 27, displayName: 'Special' },
  { id: 29, displayName: 'Cleveland' },
  { id: 31, displayName: 'Brooklyn' },
  { id: 33, displayName: 'Chicago' },
  { id: 35, displayName: 'Toronto' },
  { id: 37, displayName: 'Milwaukee' },
  { id: 39, displayName: 'Miami' },
];
export const east = [
  { id: 2, displayName: 'Oklahoma City' },
  { id: 4, displayName: 'Sacramento' },
  { id: 6, displayName: 'Dev 1' },
  { id: 8, displayName: 'Spurs' },
  { id: 10, displayName: 'New Orleans' },
  { id: 12, displayName: 'Dev 2' },
  { id: 14, displayName: 'All-Star' },
  { id: 16, displayName: 'Phoenix' },
  { id: 18, displayName: 'Dev 3' },
  { id: 20, displayName: 'Golden State' },
  { id: 22, displayName: 'Detroit' },
  { id: 24, displayName: 'Washington' },
  { id: 26, displayName: 'Dev 4' },
  { id: 28, displayName: 'Charlotte' },
  { id: 30, displayName: 'Atlanta' },
  { id: 32, displayName: 'Dev 5' },
  { id: 34, displayName: 'All-Star' },
  { id: 36, displayName: 'Philadelphia' },
  { id: 38, displayName: 'Dev 6' },
  { id: 40, displayName: 'Boston' },
];

export const cities = { [REGIONS.east]: east, [REGIONS.west]: west };

const listById = (cities: { id: number; displayName: string }[]) =>
  cities.reduce((prev, city) => ({ ...prev, [city.id]: city }), {});

export const allCities: { [n: number]: { id: number; displayName: string } } = {
  ...listById(west),
  ...listById(east),
};

export const getSide = (nounId: number) => (nounId % 2 ? REGIONS.west : REGIONS.east);

export default cities;
