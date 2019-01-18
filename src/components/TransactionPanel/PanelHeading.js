import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { createSlug, stringify } from '../../util/urlHelpers';
import { NamedLink } from '../../components';

import css from './TransactionPanel.css';

const createListingLink = (listingId, label, listingDeleted, searchParams = {}, className = '') => {
  if (!listingDeleted) {
    const params = { id: listingId, slug: createSlug(label) };
    const to = { search: stringify(searchParams) };
    return (
      <NamedLink className={className} name="ListingPage" params={params} to={to}>
        {label}
      </NamedLink>
    );
  } else {
    return <FormattedMessage id="TransactionPanel.deletedListingOrderTitle" />;
  }
};

const ListingDeletedInfoMaybe = props => {
  return props.listingDeleted ? (
    <p className={css.transactionInfoMessage}>
      <FormattedMessage id="TransactionPanel.messageDeletedListing" />
    </p>
  ) : null;
};

const HeadingCustomer = props => {
  const { className, id, values, listingDeleted } = props;
  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.mainTitle}>
          <FormattedMessage id={id} values={values} />
        </span>
      </h1>
      <ListingDeletedInfoMaybe listingDeleted={listingDeleted} />
    </React.Fragment>
  );
};

const HeadingCustomerWithSubtitle = props => {
  const { className, id, values, subtitleId, subtitleValues, children, listingDeleted } = props;
  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.mainTitle}>
          <FormattedMessage id={id} values={values} />
        </span>
        <FormattedMessage id={subtitleId} values={subtitleValues} />
      </h1>
      {children}
      <ListingDeletedInfoMaybe listingDeleted={listingDeleted} />
    </React.Fragment>
  );
};

const CustomerBannedInfoMaybe = props => {
  return props.isCustomerBanned ? (
    <p className={css.transactionInfoMessage}>
      <FormattedMessage id="TransactionPanel.customerBannedStatus" />
    </p>
  ) : null;
};

const HeadingProvider = props => {
  const { className, id, values, isCustomerBanned } = props;
  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.mainTitle}>
          <FormattedMessage id={id} values={values} />
        </span>
      </h1>
      <CustomerBannedInfoMaybe isCustomerBanned={isCustomerBanned} />
    </React.Fragment>
  );
};
const HeadingProviderWithSubtitle = props => {
  const { className, id, values, subtitleId, subtitleValues, isCustomerBanned, children } = props;
  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.mainTitle}>
          <FormattedMessage id={id} values={values} />
        </span>
        <FormattedMessage id={subtitleId} values={subtitleValues} />
      </h1>
      {children}
      <CustomerBannedInfoMaybe isCustomerBanned={isCustomerBanned} />
    </React.Fragment>
  );
};

// Functional component as a helper to choose and show Order or Sale heading info:
// title, subtitle, and message
const PanelHeading = props => {
  const {
    className,
    rootClassName,
    panelHeadingInfo = {},
    customerName,
    providerName,
    listingId,
    listingTitle,
    listingDeleted,
    isCustomerBanned,
  } = props;

  const isCustomer = props.transactionRole === 'customer';

  const defaultRootClassName = isCustomer ? css.headingOrder : css.headingSale;
  const titleClasses = classNames(rootClassName || defaultRootClassName, className);
  const listingLink = createListingLink(listingId, listingTitle, listingDeleted);

  if (panelHeadingInfo.isEnquired) {
    return isCustomer ? (
      <HeadingCustomer
        className={titleClasses}
        id="TransactionPanel.orderEnquiredTitle"
        values={{ listingLink }}
        listingDeleted={listingDeleted}
      />
    ) : (
      <HeadingProvider
        className={titleClasses}
        id="TransactionPanel.saleEnquiredTitle"
        values={{ customerName, listingLink }}
        isCustomerBanned={isCustomerBanned}
      />
    );
  } else if (panelHeadingInfo.isRequested) {
    return isCustomer ? (
      <HeadingCustomerWithSubtitle
        id="TransactionPanel.orderPreauthorizedTitle"
        values={{ customerName }}
        subtitleId="TransactionPanel.orderPreauthorizedSubtitle"
        subtitleValues={{ listingLink }}
      >
        {!listingDeleted ? (
          <p className={css.transactionInfoMessage}>
            <FormattedMessage
              id="TransactionPanel.orderPreauthorizedInfo"
              values={{ providerName }}
            />
          </p>
        ) : null}
      </HeadingCustomerWithSubtitle>
    ) : (
      <HeadingProviderWithSubtitle
        className={titleClasses}
        id="TransactionPanel.saleRequestedTitle"
        values={{ customerName, listingLink }}
      >
        {!isCustomerBanned ? (
          <p className={titleClasses}>
            <FormattedMessage id="TransactionPanel.saleRequestedInfo" values={{ customerName }} />
          </p>
        ) : null}
      </HeadingProviderWithSubtitle>
    );
  } else if (panelHeadingInfo.isAccepted) {
    return isCustomer ? (
      <HeadingCustomerWithSubtitle
        id="TransactionPanel.orderPreauthorizedTitle"
        values={{ customerName }}
        subtitleId="TransactionPanel.orderAcceptedSubtitle"
        subtitleValues={{ listingLink }}
      />
    ) : (
      <HeadingProvider
        className={titleClasses}
        id="TransactionPanel.saleAcceptedTitle"
        values={{ customerName, listingLink }}
      />
    );
  } else if (panelHeadingInfo.isDeclined) {
    return isCustomer ? (
      <HeadingCustomer
        className={titleClasses}
        id="TransactionPanel.orderDeclinedTitle"
        values={{ customerName, listingLink }}
      />
    ) : (
      <HeadingProvider
        className={titleClasses}
        id="TransactionPanel.saleDeclinedTitle"
        values={{ customerName, listingLink }}
        isCustomerBanned={isCustomerBanned}
      />
    );
  } else if (panelHeadingInfo.txIsCanceled) {
    return isCustomer ? (
      <HeadingCustomer
        className={titleClasses}
        id="TransactionPanel.orderCancelledTitle"
        values={{ customerName, listingLink }}
      />
    ) : (
      <HeadingProvider
        className={titleClasses}
        id="TransactionPanel.saleCancelledTitle"
        values={{ customerName, listingLink }}
      />
    );
  } else if (panelHeadingInfo.isDelivered) {
    return isCustomer ? (
      <HeadingCustomer
        className={titleClasses}
        id="TransactionPanel.orderDeliveredTitle"
        values={{ customerName, listingLink }}
        isCustomerBanned={isCustomerBanned}
      />
    ) : (
      <HeadingProvider
        className={titleClasses}
        id="TransactionPanel.saleDeliveredTitle"
        values={{ customerName, listingLink }}
        isCustomerBanned={isCustomerBanned}
      />
    );
  } else {
    return null;
  }
};

export default PanelHeading;
