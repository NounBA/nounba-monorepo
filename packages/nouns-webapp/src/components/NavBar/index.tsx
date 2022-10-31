import { useAppSelector } from '../../hooks';
import classes from './NavBar.module.css';
import logo from '../../assets/logo.svg';
import { useEtherBalance } from '@usedapp/core';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import testnetNoun from '../../assets/testnet-noun.png';
import config, { CHAIN_ID } from '../../config';
import { utils } from 'ethers';
import { buildEtherscanHoldingsLink } from '../../utils/etherscan';
import { NavBarButtonStyle } from '../NavBarButton';
// import NavBarButton, { NavBarButtonStyle } from '../NavBarButton';
// import { ExternalURL, externalURL } from '../../utils/externalURL';
// import { Trans } from '@lingui/macro';
// import { File } from 'lucide-react';
import useLidoBalance from '../../hooks/useLidoBalance';
import NavBarTreasury from '../NavBarTreasury';
import NavWallet from '../NavWallet';
import { useState } from 'react';
// import { File, Users } from 'lucide-react';

const NavBar = () => {
  const activeAccount = useAppSelector(state => state.account.activeAccount);
  // const isCool = useAppSelector(state => state.application.isCoolBackground);
  // const history = useHistory();
  const ethBalance = useEtherBalance(config.addresses.nounsDaoExecutor);
  const lidoBalanceAsETH = useLidoBalance();
  const treasuryBalance = ethBalance && lidoBalanceAsETH && ethBalance.add(lidoBalanceAsETH);
  const daoEtherscanLink = buildEtherscanHoldingsLink(config.addresses.nounsDaoExecutor);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  // const useStateBg =
  //   history.location.pathname === '/' ||
  //   history.location.pathname.includes('/noun/') ||
  //   history.location.pathname.includes('/auction/');

  // const nonWalletButtonStyle = !useStateBg
  //   ? NavBarButtonStyle.WHITE_INFO
  //   : isCool
  //   ? NavBarButtonStyle.COOL_INFO
  //   : NavBarButtonStyle.WARM_INFO;
  const nonWalletButtonStyle =
    // NavBarButtonStyle.WHITE_INFO
    // NavBarButtonStyle.COOL_INFO;
    NavBarButtonStyle.WARM_INFO;

  // const closeNav = () => setIsNavExpanded(false);

  return (
    <>
      {Number(CHAIN_ID) !== 1 && (
        <div className={classes.testnet}>
          <img className={classes.testnetImg} src={testnetNoun} alt="testnet noun" />
          TESTNET
        </div>
      )}
      <Navbar expand="lg" className={classes.navBarCustom} expanded={isNavExpanded}>
        <Container style={{ maxWidth: 'unset' }}>
          <div className={classes.brandAndTreasuryWrapper}>
            <Navbar.Brand as={Link} to="/" className={classes.navBarBrand}>
              <img src={logo} className={classes.navBarLogo} alt="Nouns DAO logo" />
              {/* <h1 className={classes.navLogoTitle}>NounBA</h1> */}
            </Navbar.Brand>
          </div>
          <Navbar.Toggle
            className={classes.navBarToggle}
            aria-controls="basic-navbar-nav"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
          />
          <Navbar.Collapse className={classes.navbarCollapse}>
            {treasuryBalance && (
              <Nav.Link
                href={daoEtherscanLink}
                className={classes.nounsNavLink}
                target="_blank"
                rel="noreferrer"
              >
                <NavBarTreasury
                  // treasuryBalance={'1000'}
                  treasuryBalance={Number(utils.formatEther(treasuryBalance)).toFixed(2)}
                  treasuryStyle={nonWalletButtonStyle}
                />
              </Nav.Link>
            )}
            {/* <Nav.Link as={Link} to="/vote" className={classes.nounsNavLink} onClick={closeNav}>
              <NavBarButton
                buttonText={<Trans>DAO</Trans>}
                buttonIcon={<Users size={24} />}
                buttonStyle={nonWalletButtonStyle}
              />
            </Nav.Link> */}
            {/* <Nav.Link
              href={externalURL(ExternalURL.notion)}
              className={classes.nounsNavLink}
              target="_blank"
              rel="noreferrer"
              onClick={closeNav}
            >
              <NavBarButton
                buttonText={<Trans>Docs</Trans>}
                buttonIcon={<File size={24} />}
                buttonStyle={nonWalletButtonStyle}
              />
            </Nav.Link> */}
            <NavWallet address={activeAccount || '0'} buttonStyle={nonWalletButtonStyle} />{' '}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
