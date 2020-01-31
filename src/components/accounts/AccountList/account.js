import React from 'react';
import withStyles from 'react-jss';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { CardText } from 'material-ui/Card';
import {
  ButtonGroup, Card, Account as AddressAvatar
} from 'emerald-js-ui';
import Button from 'elements/Button';
import muiThemeable from 'material-ui/styles/muiThemeable';
import SecondaryMenu from '../SecondaryMenu';
import AccountBalance from '../Balance';
import TokenUnits from '../../../lib/tokenUnits';

const styles2 = {
  tokensDivider: {
    backgroundColor: '#F5F5F5',
    height: '2px',
    width: '100%',
    border: 'none',
  },
  identityIconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
};

export class Account extends React.Component {
    static propTypes = {
      account: PropTypes.object.isRequired,
      openAccount: PropTypes.func.isRequired,
      createTx: PropTypes.func,
      showReceiveDialog: PropTypes.func,
      showFiat: PropTypes.bool,
      classes: PropTypes.object,
    };

    onSendClick = () => this.props.createTx(this.props.account);

    onAddressClick = () => this.props.openAccount(this.props.account);

    onAddEtcClick = () => this.props.showReceiveDialog(this.props.account);

    render() {
      const {
        account, muiTheme, classes, showFiat,
      } = this.props;
      const fiatStyle = {
        fontSize: '16px',
        lineHeight: '19px',
        color: muiTheme.palette.secondaryTextColor,
      };

      // TODO: we convert Wei to TokenUnits here
      const balance = account.get('balance') ? new TokenUnits(account.get('balance').value(), 18) : null;
      const accId = account.get('id');
      return (
        <Card>
          <CardText>
            <Grid container>
              <Grid item xs={5}>
                { accId && <AddressAvatar
                  identity
                  addr={ accId }
                  description={ account.get('description') }
                  primary={ account.get('name') }
                  onAddressClick={ this.onAddressClick }
                /> }
              </Grid>
              <Grid item xs={3}>
                <div className={ classes.identityIconContainer }>
                  <div style={{marginLeft: '10px'}}>
                    {balance && <AccountBalance
                      fiatStyle={fiatStyle}
                      balance={ balance }
                      symbol="MINTME"
                      showFiat={ showFiat }
                    />}
                    {!balance && 'loading...'}
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={ classes.actionsContainer }>
                  <ButtonGroup>
                    <SecondaryMenu account={account} />
                    <Button
                      label="Add MINTME"
                      onClick={ this.onAddEtcClick }
                      style={{background: 'rgb(33, 150, 243)'}}
                    />
                    <Button
                      label="Send"
                      disabled={ !account.get('balance') }
                      onClick={ this.onSendClick }
                      style={{background: 'rgb(33, 150, 243)'}}
                    />
                  </ButtonGroup>
                </div>
              </Grid>
            </Grid>
          </CardText>
        </Card>);
    }
}

export default muiThemeable()(withStyles(styles2)(Account));
