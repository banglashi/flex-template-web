import React from 'react';
import { ExternalLink } from '../../components';

import css from './TransactionPanel.css';

// Functional component as a helper to build AddressLinkMaybe
const AddressLinkMaybe = props => {
  const { location, geolocation, showAddress } = props;
  const { address, building } = location || {};
  const { lat, lng } = geolocation || {};
  const hrefToGoogleMaps = geolocation
    ? `https://maps.google.com/?q=${lat},${lng}`
    : address
    ? `https://maps.google.com/?q=${encodeURIComponent(address)}`
    : null;

  const fullAddress =
    typeof building === 'string' && building.length > 0 ? `${building}, ${address}` : address;

  return showAddress && hrefToGoogleMaps ? (
    <p className={css.address}>
      <ExternalLink href={hrefToGoogleMaps}>{fullAddress}</ExternalLink>
    </p>
  ) : null;
};

export default AddressLinkMaybe;
