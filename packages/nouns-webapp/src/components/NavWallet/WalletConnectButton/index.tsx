import React from 'react';
import { Nav } from 'react-bootstrap';
import NavBarButton, { NavBarButtonStyle } from '../../NavBarButton';
import { Trans } from '@lingui/macro';
import { Wallet } from 'lucide-react';

interface WalletConnectButtonProps {
  className: string;
  onClickHandler: () => void;
  buttonStyle: NavBarButtonStyle;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = props => {
  const { className, onClickHandler, buttonStyle } = props;
  return (
    <Nav.Link className={className} onClick={onClickHandler}>
      <NavBarButton
        buttonStyle={buttonStyle}
        buttonText={<Trans>Connect Wallet</Trans>}
        buttonIcon={<Wallet size={24} />}
      />
    </Nav.Link>
  );
};

export default WalletConnectButton;
