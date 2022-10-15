import Section from '../../layout/Section';
import classes from './Documentation.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Link from '../Link';
import { Trans } from '@lingui/macro';

const Documentation = () => {
  const publicDomainLink = (
    <Link
      text={<Trans>public domain</Trans>}
      url="https://creativecommons.org/publicdomain/zero/1.0/"
      leavesPage={true}
    />
  );
  const compoundGovLink = (
    <Link
      text={<Trans>Compound Governance</Trans>}
      url="https://compound.finance/governance"
      leavesPage={true}
    />
  );
  const protocolGuildLink = (
    <Link
      text={<Trans>Protocol Guild</Trans>}
      url="https://protocol-guild.readthedocs.io/en/latest/index.html"
      leavesPage={true}
    />
  );
  return (
    <div className={classes.wrapper}>
      <Section fullWidth={false}>
        {/* <div className={classes.headerWrapper}>
          <h1>
            <Trans>WTF?</Trans>
          </h1>
          <p className={classes.aboutText}>
            <Trans>
              Nouns are an experimental attempt to improve the formation of on-chain avatar
              communities. While projects such as {cryptopunksLink} have attempted to bootstrap
              digital community and identity, Nouns attempt to bootstrap identity, community,
              governance, and a treasury that can be used by the community.
            </Trans>
          </p>
          <p className={classes.aboutText} style={{ paddingBottom: '4rem' }}>
            <Trans>
              Learn more below, or start creating Nouns off-chain using the {playgroundLink}.
            </Trans>
          </p>
        </div> */}
        <Accordion flush>
          <Accordion.Item eventKey="0" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Summary</Trans>
            </Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <ul>
                <li>
                  <Trans>
                    NounBA is a fan organization, not directly affiliated with any leagues.
                  </Trans>
                </li>
                <li>
                  <Trans>Nouns artwork is in the {publicDomainLink}.</Trans>
                </li>
                <li>
                  <Trans>34 NounBAs will be auctioned between Oct 9-17, 2022.</Trans>
                </li>
                <li>
                  <Trans>The auction proceeds will be distributed as follows:</Trans>
                  <ul>
                    <li>69% to the treasury</li>
                    <li>9% to fantasy leagues (3% for 3 years)</li>
                    <li>12% to NounBA founders</li>
                    <li>9% to NounBA DAO</li>
                    <li>1% to {protocolGuildLink}</li>
                  </ul>
                </li>
                <li>
                  <Trans>All NounBAs are members of the NounBA DAO.</Trans>
                </li>
                <li>
                  <Trans>NounBA DAO uses NounBA DAO’s fork of Compound Governance.</Trans>
                </li>
                <li>
                  <Trans>1 NounBA is equal to 1 vote.</Trans>
                </li>
                <li>
                  <Trans>The treasury is controlled exclusively by NounBAs via governance.</Trans>
                </li>
                <li>
                  <Trans>NounBA founders receive 6 NounBAs, bringing the total supply to 40.</Trans>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>34 Auctions</Trans>
            </Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <p className={classes.aboutText}>
                <Trans>
                  The Nouns Auction Contract will act as a self-sufficient Noun generation and
                  distribution mechanism, auctioning one Noun every 24 hours, forever. 100% of
                  auction proceeds (ETH) are automatically deposited in the NounBA DAO treasury,
                  where they are governed by Noun owners.
                </Trans>
              </p>

              <p className={classes.aboutText}>
                <Trans>
                  34 NounBAs will be auctioned between Oct 9-17, 2022. Starting on Oct 9 at [start
                  time], 2 simultaneous [duration in hours] auctions will be kicked off. Each time
                  an auction is settled, a new NounBA will be minted and a new [duration in hours]
                  auction will begin. Bids within the last [duration in minutes] reset the auction
                  timer to [duration in minutes].
                </Trans>
              </p>
              <p>
                <Trans>The auction proceeds will be distributed as follows:</Trans>
              </p>
              <ul>
                <li>69% to the treasury</li>
                <li>9% to fantasy leagues (3% for 3 years)</li>
                <li>12% to NounBA founders</li>
                <li>9% to NounBA DAO</li>
                <li>1% to {protocolGuildLink}</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>NounBA DAO</Trans>
            </Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <Trans>
                NounBA DAO utilizes NounBA DAO's fork of {compoundGovLink} and is the main governing
                body of the NounBA ecosystem. The NounBA DAO treasury receives 69% of ETH proceeds
                from the 34 NounBA auctions. Each of the 40 NounBAs is an irrevocable member of
                NounBA DAO and entitled to one vote in all governance matters. NounBA votes are
                non-transferable (if you sell your NounBA the vote goes with it) but delegatable,
                which means you can assign your vote to someone else as long as you own your NounBA.
              </Trans>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Governance ‘Slow Start’</Trans>
            </Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <p>
                <Trans>
                  In addition to the precautions taken by Compound Governance, the NounBA founders
                  have given themselves a special veto right to stop proposals that introduce
                  non-trivial legal or existential risks to the NounBA DAO, including (but not
                  necessarily limited to) proposals that
                </Trans>
              </p>
              <ul>
                <li>unequally withdraw the treasury for personal gain</li>
                <li>bribe voters to facilitate withdraws of the treasury for personal gain</li>
                <li>
                  attempt to alter Noun auction cadence for the purpose of maintaining or acquiring
                  a voting majority
                </li>
                <li>make upgrades to critical smart contracts without undergoing an audit</li>
              </ul>
              <p>
                <Trans>
                  The NounBA founders consider the veto an emergency power that should not be
                  exercised in the normal course of business. In the future, the NounBA DAO aims to
                  replace this veto power with another more robust solution.
                </Trans>
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>NounBA Traits</Trans>
            </Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <p>
                <Trans>
                  NounBA is made up of 40 1-of-1 artworks. 30 of the artworks draw inspiration from
                  basketball teams. No copyright or official team IP is featured (e.g. names,
                  logos). NounBA traits match the structure of Noun traits (background, body,
                  accessory, head, glasses).
                </Trans>
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>On-Chain Artwork</Trans>
            </Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <p>
                <Trans>
                  NounBAs are stored directly on Ethereum and do not utilize pointers to other
                  networks such as IPFS. This is possible because NounBA artwork is compressed and
                  stored on-chain using a custom run-length encoding (RLE), which is a form of
                  lossless compression.
                </Trans>
              </p>

              <p>
                <Trans>
                  The compressed parts are efficiently converted into a single base64 encoded SVG
                  image on-chain. To accomplish this, each part is decoded into an intermediate
                  format before being converted into a series of SVG rects using batched, on-chain
                  string concatenation. Once the entire SVG has been generated, it is base64
                  encoded.
                </Trans>
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>NounBA Founder’s Reward</Trans>
            </Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <p>
                <Trans>Here are the NounBA Founders</Trans>
              </p>
              <ul>
                <li>
                  <Link text="@apenoun" url="https://twitter.com/apenoun" leavesPage={true} />
                </li>
                <li>
                  <Link text="@dh_amiyoko" url="https://twitter.com/dh_amiyoko" leavesPage={true} />
                </li>
                <li>
                  <Link text="@jokuyiga" url="https://twitter.com/jokuyiga" leavesPage={true} />
                </li>
                <li>
                  <Link text="@kyza" url="https://twitter.com/kyza" leavesPage={true} />
                </li>
                <li>
                  <Link text="@neuroswish" url="https://twitter.com/neuroswish" leavesPage={true} />
                </li>
                <li>
                  <Link text="@TheArodEth" url="https://twitter.com/TheArodEth" leavesPage={true} />
                </li>
              </ul>
              <p>
                NounBA founders will be compensated with 6 NounBAs and 12% of the 34 auction
                proceeds.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Section>
    </div>
  );
};
export default Documentation;
