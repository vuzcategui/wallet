import React from 'react';
import {
  ButtonGroup, IdentityIcon, Input
} from 'emerald-js-ui';
import { ArrowRight } from '@emeraldplatform/ui-icons';
import { required } from 'lib/validators';
import Button from 'elements/Button';
import { Divider } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Form, Row, styles } from '../../../../elements/Form';
import { Currency } from '../../../../lib/currency';

const HorizontalAddressWithIdentity = (props) => {
  if (props.hide) {
    return null;
  }
  return (
    <div style={{
      display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center',
    }}>
      <IdentityIcon size={60} id={props.accountId} />
      <div style={{paddingTop: '10px'}}>{props.accountId}</div>
    </div>
  );
};


const passwordFields = (props) => {
  if (props.useLedger) {
    return null;
  }
  return (
    <Row>
      <div style={styles.left}>
        <div style={styles.fieldName}>
          Password
        </div>
      </div>
      <div style={styles.right}>
        <Input
          name="password"
          type="password"
          onChange={props.onChange}
          style={{ minWidth: '600px' }}
          hintText="Enter your Password"
          underlineShow={false}
          fullWidth={true}
        />
      </div>
    </Row>
  );
};

const displayFlexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};


const TypedData = (props) => {
  const { typedData } = props;
  if (!typedData) { return null; }

  const listStyle = {
    cursor: 'default',
  };
  const listProps = {
    disableTouchRipple: true,
    hoverColor: 'transparent',
    autoGenerateNestedIndicator: false,
    initiallyOpen: true,
  };
  const getNestedItems = () => {
    return typedData.get('argsDefaults').toJS().map((item, i) => {
      return (
        <ListItem key={i} {...listProps} style={listStyle} primaryText={item.name} secondaryText={item.value} />
      );
    });
  };
  return (
    <div>
      <List>
        <ListItem {...listProps} style={listStyle} primaryText="Method to be called" secondaryText={typedData.get('name')} />
        <ListItem {...listProps} style={listStyle} primaryText="Params" nestedItems={getNestedItems()}/>
      </List>
    </div>
  );
};


const getTypedDataOrDeploy = (props) => {
  if (props.mode === 'contract_function') {
    return (
      <React.Fragment>
        <Divider style={{ marginTop: '35px' }} />
        <TypedData typedData={props.typedData} />
        <Divider style={{ marginTop: '35px' }} />
      </React.Fragment>
    );
  }

  if (props.mode === 'contract_constructor') {
    return (
      <React.Fragment>
        <div>CONTRACT DEPLOY</div>
        <Divider style={{ marginTop: '35px' }} />
      </React.Fragment>
    );
  }
};

const SignTx = muiThemeable()((props) => {
  const {
    value, fiatRate, fiatCurrency, txFee, tx,
  } = props;
  const {
    onCancel, onChangePassword, onSubmit, useLedger, typedData,
  } = props;

  const onChange = (event, val) => {
    onChangePassword(val);
  };

  // const USDValue = Currency.format(Currency.convert(tx.amount, fiatRate, 2), fiatCurrency);
  const hideAccounts = tx.to === '0';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
        <HorizontalAddressWithIdentity accountId={tx.from} hide={hideAccounts}/>
        <div style={{
          display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div style={{ ...displayFlexCenter, flexDirection: 'column' }}>
            {/* <div>{USDValue} USD</div> */}
            <div style={{fontSize: '28px'}}>{tx.amount} {tx.token}</div>
          </div>
          <div style={{display: hideAccounts ? 'none' : 'flex'}}>
            <ArrowRight />
          </div>
        </div>
        <HorizontalAddressWithIdentity accountId={tx.to} hide={hideAccounts}/>
      </div>
      <div style={{ paddingTop: '35px', display: 'flex', justifyContent: 'center' }}>
        <span style={{ color: props.muiTheme.palette.secondaryTextColor }}>
          Plus {txFee} MINTME for {tx.gasLimit} GAS.
        </span>
      </div>
      {
        getTypedDataOrDeploy(props)
      }
      <Form style={{ marginTop: '0' }}>
        {passwordFields({...props, onChange})}
        <Row>
          <div style={styles.left} />
          <div style={{ paddingTop: '10px', ...styles.right }}>
            <ButtonGroup>
              <Button label="Cancel" onClick={onCancel} />
              <Button primary label="Sign & Send Transaction" onClick={onSubmit} />
            </ButtonGroup>
          </div>
        </Row>
      </Form>
    </div>
  );
});

export default SignTx;
