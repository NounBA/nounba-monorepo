import { Contract } from 'ethers';

export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42,
}

// prettier-ignore
export type DescriptorV1ContractNames = 'NFTDescriptor' | 'NounsDescriptor';
// prettier-ignore
export type DescriptorV2ContractNames = 'NFTDescriptorV2' | 'NounsDescriptorV2' | 'SVGRenderer' | 'NounsArt' | 'Inflator';
// prettier-ignore
export type ContractName = DescriptorV2ContractNames | 'NounsSeeder' | 'NounsToken' | 'NounsAuctionHouse' | 'NounsAuctionHouseProxy2' | 'NounsAuctionHouseProxyAdmin' | 'NounsAuctionHouseProxy' | 'NounsDAOExecutor' | 'NounsDAOLogicV1' | 'NounsDAOProxy';
// prettier-ignore
export type ContractNameDescriptorV1 = DescriptorV1ContractNames | 'NounsSeeder' | 'NounsToken' | 'NounsAuctionHouse' | 'NounsAuctionHouseProxyAdmin' | 'NounsAuctionHouseProxy' | 'NounsDAOExecutor' | 'NounsDAOLogicV1' | 'NounsDAOProxy';

export interface ContractDeployment {
  artifactName?: string;
  args?: (string | number | (() => string))[];
  libraries?: () => Record<string, string>;
  waitForConfirmation?: boolean;
  validateDeployment?: () => void;
}

export interface DeployedContract {
  name: string;
  address: string;
  instance: Contract;
  constructorArguments: (string | number)[];
  libraries: Record<string, string>;
}

export interface ContractRow {
  Address: string;
  'Deployment Hash'?: string;
}
