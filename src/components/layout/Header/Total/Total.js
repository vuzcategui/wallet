// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { Wei } from '@emeraldplatform/emerald-js';
import { EtcSimple } from '@emeraldplatform/ui-icons';
import Button from '../../../../elements/Button';
import Accounts from '../../../../store/vault/accounts';
import WalletSettings from '../../../../store/wallet/settings';
import { Currency } from '../../../../lib/currency';

type Props = {
  total: string,
  showFiat?: boolean,
  fiatAmount?: string,
  fiatCurrency?: string,
};

const styles = {
  text: {
    textTransform: 'none',
    fontWeight: 'normal',
    fontSize: '16px',
    color: '#B1BFB7 !important',
  },
  root: {
    lineHeight: 'inherit',
  },
};

const Total = ({
  total, showFiat, fiatAmount, fiatCurrency, classes,
}: Props) => {
  let totalFormatted = `${total} MINTME`;
  if (showFiat && fiatAmount) {
    totalFormatted = `${totalFormatted} - ${fiatAmount} ${fiatCurrency}`;
  }
  return (
    <Button
      color="secondary"
      variant="text"
      disabled={true}
      label={totalFormatted}
      classes={classes}
    />
  );
};

Total.propTypes = {
  showFiat: PropTypes.bool,
  total: PropTypes.string.isRequired,
};

const StyledTotal = withStyles(styles)(Total);

export default connect(
  (state, ownProps) => {
    // Sum of balances of all known accounts.
    const total: Wei = Accounts.selectors.selectTotalBalance(state);
    const fiatCurrency = WalletSettings.selectors.fiatCurrency(state);
    const fiatRate = WalletSettings.selectors.fiatRate(state);
    let fiatAmount;
    if (fiatRate && fiatCurrency) {
      fiatAmount = Currency.format(Currency.convert(total.getEther(), fiatRate), fiatCurrency);
    }

    return {
      fiatCurrency,
      fiatAmount,
      total: total.getEther(),
    };
  },
  (dispatch, ownProps) => ({})
)(StyledTotal);
