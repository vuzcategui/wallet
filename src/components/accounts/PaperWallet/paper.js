import React from 'react';
import withStyles from 'react-jss';
import QRCode from 'qrcode.react';
import IconButton from '@material-ui/core/IconButton';
import { Print, Close } from '@emeraldplatform/ui-icons';

import { LogoIcon } from '../../../elements/Icons';

export const styles2 = {
  container: {
    height: '230px',
    width: '545px',
    border: '1px solid #DDDDDD',
    backgroundColor: '#FFFFFF',
  },
  addressLabel: {
    lineHeight: '24px',
    fontSize: '12px',
    fontWeight: 500,
  },
  addressValue: {
    lineHeight: '24px',
    fontSize: '12px',
  },
  privateLabel: {
    lineHeight: '24px',
    fontSize: '12px',
    fontWeight: 500,
    textAlign: 'right',
  },
  privateValue: {
    lineHeight: '24px',
    textAlign: 'right',
    fontSize: '12px',
  },
  title: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    letterSpacing: '2px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  main: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  addressBlock: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  qrCodesBlock: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  privateBlock: {
    display: 'flex',
  },
  notes: {
    backgroundColor: '#F6F6F6',
    flexGrow: 1,
    marginTop: '5px',
    marginLeft: '20px',
    marginRight: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  notesCaption: {
    opacity: 0.5,
    color: '#191919',
    fontSize: '9px',
    lineHeight: '24px',
  },
  logoContainer: {
    minWidth: '33px',
  },
};

export const PaperWallet = (props) => {
  const {
    address, privKey, onCancel, classes,
  } = props;

  const Logo = (
    <div className={classes.logoContainer}>
      <div className={classes.logoIcon }>
        <LogoIcon width="17px" height="33px" />
      </div>
    </div>
  );

  const Wallet = (
    <div className={classes.container}>
      <div className={classes.title}>MY MINTME COIN WALLET</div>
      <div className={classes.main}>
        <div className={classes.addressBlock}>
          <div>
            <div className={classes.addressLabel}>YOUR ADDRESS</div>
            <div className={classes.addressValue}>{ address }</div>
          </div>
          {Logo}
        </div>
        <div className={classes.qrCodesBlock}>
          <div>
            <QRCode size={100} value={ address } />
          </div>
          <div className={classes.notes}>
            <div className={classes.notesCaption}>AMOUNT/NOTES</div>
          </div>
          <div>
            <QRCode size={100} value={ privKey } />
          </div>
        </div>
        <div className={classes.privateBlock}>
          {Logo}
          <div style={{flexGrow: 1}}>
            <div className={classes.privateLabel}>YOUR PRIVATE KEY</div>
            <div className={classes.privateValue}>{ privKey }</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div>{Wallet}</div>
      <div>
        <IconButton onClick={() => window.print()}>
          <Print />
        </IconButton>
        <IconButton onClick={ onCancel }>
          <Close />
        </IconButton>
      </div>
    </div>);
};

export default withStyles(styles2)(PaperWallet);
