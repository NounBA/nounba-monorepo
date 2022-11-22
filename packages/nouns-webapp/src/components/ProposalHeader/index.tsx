import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProposalStatus from '../ProposalStatus';
import classes from './ProposalHeader.module.css';
import navBarButtonClasses from '../NavBarButton/NavBarButton.module.css';
import { Proposal, useHasVotedOnProposal, useProposalVote } from '../../wrappers/nounsDao';
import clsx from 'clsx';
import { useUserVotesAsOfBlock } from '../../wrappers/nounToken';
import { useBlockTimestamp } from '../../hooks/useBlockTimestamp';
import { Trans } from '@lingui/macro';
import { i18n } from '@lingui/core';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import { transactionLink } from '../ProposalContent';
import ShortAddress from '../ShortAddress';
import HoverCard from '../HoverCard';
import ByLineHoverCard from '../ByLineHoverCard';
import { ArrowLeft } from 'lucide-react';

interface ProposalHeaderProps {
  proposal: Proposal;
  isActiveForVoting?: boolean;
  isWalletConnected: boolean;
  submitButtonClickHandler: () => void;
}

const getTranslatedVoteCopyFromString = (proposalVote: string) => {
  if (proposalVote === 'For') {
    return (
      <Trans>
        You voted <strong>For</strong> this proposal
      </Trans>
    );
  }
  if (proposalVote === 'Against') {
    return (
      <Trans>
        You voted <strong>Against</strong> this proposal
      </Trans>
    );
  }
  return (
    <Trans>
      You <strong>Abstained</strong> from this proposal
    </Trans>
  );
};

const ProposalHeader: React.FC<ProposalHeaderProps> = props => {
  const { proposal, isActiveForVoting, isWalletConnected, submitButtonClickHandler } = props;

  const availableVotes = useUserVotesAsOfBlock(proposal?.createdBlock) ?? 0;
  const hasVoted = useHasVotedOnProposal(proposal?.id);
  const proposalVote = useProposalVote(proposal?.id);
  const proposalCreationTimestamp = useBlockTimestamp(proposal?.createdBlock);
  const disableVoteButton = !isWalletConnected || !availableVotes || hasVoted;

  const voteButton = (
    <>
      {isWalletConnected ? (
        <>
          {!availableVotes && (
            <div className={classes.noVotesText}>
              <Trans>You have no votes.</Trans>
            </div>
          )}
        </>
      ) : (
        <div className={classes.helperText}>
          <Trans>Connect a wallet to vote.</Trans>
        </div>
      )}
      <Button
        className={disableVoteButton ? classes.submitBtnDisabled : classes.submitBtn}
        disabled={disableVoteButton}
        onClick={submitButtonClickHandler}
      >
        <Trans>Submit vote</Trans>
      </Button>
    </>
  );

  const proposer = (
    <a
      href={buildEtherscanAddressLink(proposal.proposer || '')}
      target="_blank"
      rel="noreferrer"
      className={classes.proposerLinkJp}
    >
      <ShortAddress address={proposal.proposer || ''} avatar={false} />
    </a>
  );

  const proposedAtTransactionHash = (
    <Trans>
      at{' '}
      <span className={classes.propTransactionHash}>
        {transactionLink(proposal.transactionHash)}
      </span>
    </Trans>
  );

  return (
    <>
      <div className={clsx(classes.wrapper)}>
        <div className={clsx('d-flex justify-content-between align-items-center')}>
          <div className="d-flex justify-content-start align-items-start">
            <Link to={'/vote'}>
              <button className={clsx(classes.backButton, navBarButtonClasses.whiteInfo)}>
                <ArrowLeft size={24} />
              </button>
            </Link>
            <div className={classes.headerRow}>
              <span>
                <div className="d-flex">
                  <div>
                    <Trans>Proposal {i18n.number(parseInt(proposal.id || '0'))}</Trans>
                  </div>
                  <div>
                    <ProposalStatus status={proposal?.status} className={classes.proposalStatus} />
                  </div>
                </div>
              </span>
              <div className={classes.proposalTitleWrapper}>
                <div className={classes.proposalTitle}>
                  <h1>{proposal.title} </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.byLineWrapper}>
          <h3>Proposed by</h3>

          <div className={classes.byLineContentWrapper}>
            <HoverCard
              hoverCardContent={(tip: string) => <ByLineHoverCard proposerAddress={tip} />}
              tip={proposal && proposal.proposer ? proposal.proposer : ''}
              id="byLineHoverCard"
            >
              <h3>
                {proposer}
                <span className={classes.propTransactionWrapper}>{proposedAtTransactionHash}</span>
              </h3>
            </HoverCard>
          </div>
        </div>
      </div>

      {/* <div className={classes.submitProposalButton}>{voteButton}</div> */}
      {proposal && isActiveForVoting && (
        <div className={classes.submitProposalButton}>
          {hasVoted && (
            <div className={classes.helperText}>
              {getTranslatedVoteCopyFromString(proposalVote)}
            </div>
          )}

          {proposalCreationTimestamp && !!availableVotes && !hasVoted && (
            <div className={classes.helperTextSmall}>
              <Trans>
                Only NounBAs you owned or were delegated to you before{' '}
                {i18n.date(new Date(proposalCreationTimestamp * 1000), {
                  dateStyle: 'long',
                  timeStyle: 'long',
                })}{' '}
                are eligible to vote.
              </Trans>
            </div>
          )}
          {isActiveForVoting && voteButton}
        </div>
      )}
    </>
  );
};

export default ProposalHeader;
