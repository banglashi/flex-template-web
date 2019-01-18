import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { PrimaryButton, SecondaryButton } from '../../components';

import css from './TransactionPanel.css';

// Functional component as a helper to build ActionButtons for
// provider when state is preauthorized
const SaleActionButtonsMaybe = props => {
  const {
    className,
    rootClassName,
    canShowButtons,
    transactionId,
    acceptInProgress,
    declineInProgress,
    acceptSaleError,
    declineSaleError,
    onAcceptSale,
    onDeclineSale,
  } = props;

  const buttonsDisabled = acceptInProgress || declineInProgress;

  const acceptErrorMessage = acceptSaleError ? (
    <p className={css.actionError}>
      <FormattedMessage id="TransactionPanel.acceptSaleFailed" />
    </p>
  ) : null;
  const declineErrorMessage = declineSaleError ? (
    <p className={css.actionError}>
      <FormattedMessage id="TransactionPanel.declineSaleFailed" />
    </p>
  ) : null;

  const classes = classNames(rootClassName || css.actionButtons, className);

  return canShowButtons ? (
    <div className={classes}>
      <div className={css.actionErrors}>
        {acceptErrorMessage}
        {declineErrorMessage}
      </div>
      <div className={css.actionButtonWrapper}>
        <SecondaryButton
          inProgress={declineInProgress}
          disabled={buttonsDisabled}
          onClick={() => onDeclineSale(transactionId)}
        >
          <FormattedMessage id="TransactionPanel.declineButton" />
        </SecondaryButton>
        <PrimaryButton
          inProgress={acceptInProgress}
          disabled={buttonsDisabled}
          onClick={() => onAcceptSale(transactionId)}
        >
          <FormattedMessage id="TransactionPanel.acceptButton" />
        </PrimaryButton>
      </div>
    </div>
  ) : null;
};

export default SaleActionButtonsMaybe;
