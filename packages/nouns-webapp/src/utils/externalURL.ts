export enum ExternalURL {
  discord,
  twitter,
  notion,
  discourse,
  opensea,
}

export const externalURL = (externalURL: ExternalURL) => {
  switch (externalURL) {
    case ExternalURL.discord:
      return 'https://discord.gg/4cm8arRBkM';
    case ExternalURL.twitter:
      return 'https://twitter.com/nounba_wtf';
    case ExternalURL.notion:
      return 'https://nouns.notion.site/Explore-Nouns-a2a9dceeb1d54e10b9cbf3f931c2266f';
    case ExternalURL.discourse:
      return 'https://discourse.nouns.wtf/';
    case ExternalURL.opensea:
      return 'https://opensea.io/collection/nounba/';
  }
};
