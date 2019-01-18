import React from 'react';
import { BookingPanel } from '../../components';

import css from './TransactionPanel.css';

// Functional component as a helper to build a BookingPanel
const BookingPanelMaybe = props => {
  const {
    authorDisplayName,
    isEnquiry,
    transactionRole,
    listing,
    listingTitle,
    subTitle,
    provider,
    onSubmit,
    onManageDisableScrolling,
    timeSlots,
    fetchTimeSlotsError,
  } = props;

  const isProviderLoaded = !!provider.id;
  const isProviderBanned = isProviderLoaded && provider.attributes.banned;
  const isCustomer = transactionRole === 'customer';
  const canShowBookingPanel = isCustomer && isEnquiry && !isProviderBanned;

  return canShowBookingPanel ? (
    <BookingPanel
      className={css.bookingPanel}
      titleClassName={css.bookingTitle}
      isOwnListing={false}
      listing={listing}
      handleBookingSubmit={() => console.log('submit')}
      title={listingTitle}
      subTitle={subTitle}
      authorDisplayName={authorDisplayName}
      onSubmit={onSubmit}
      onManageDisableScrolling={onManageDisableScrolling}
      timeSlots={timeSlots}
      fetchTimeSlotsError={fetchTimeSlotsError}
    />
  ) : null;
};

export default BookingPanelMaybe;
