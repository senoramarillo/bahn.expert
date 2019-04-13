// @flow
import { connect } from 'react-redux';
import { type ContextRouter, withRouter } from 'react-router-dom';
import ActionHome from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import type { CommonState } from 'AppState';

type DispatchProps = {|
  dispatch: Dispatch<*>,
|};
type OwnProps = {||};
type StateProps = {|
  routingFeature: boolean,
|};
type ReduxProps = {|
  ...DispatchProps,
  ...OwnProps,
  ...StateProps,
|};
type Props = {|
  ...ReduxProps,
  ...ContextRouter,
|};

const HomeMenu = ({ history, routingFeature }: Props) => {
  const [anchor, setAnchor] = useState<?HTMLElement>(undefined);

  const toggleMenu = (e: SyntheticEvent<HTMLElement>) =>
    setAnchor(anchor ? undefined : e.currentTarget);
  const toAbfahrten = (e: SyntheticEvent<HTMLElement>) => {
    history.push('/');
    toggleMenu(e);
  };
  const toRouting = (e: SyntheticEvent<HTMLElement>) => {
    history.push('/routing');
    toggleMenu(e);
  };

  return (
    <>
      <IconButton
        aria-label="Home"
        onClick={routingFeature ? toggleMenu : toAbfahrten}
        color="inherit"
      >
        <ActionHome color="inherit" />
      </IconButton>
      {routingFeature && (
        <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={toggleMenu}>
          <MenuItem onClick={toAbfahrten}>Abfahrten</MenuItem>
          <MenuItem onClick={toRouting}>Routing (WIP)</MenuItem>
        </Menu>
      )}
    </>
  );
};

export default connect<
  ReduxProps,
  OwnProps,
  StateProps,
  DispatchProps,
  CommonState,
  _
>(state => ({
  routingFeature: state.features.routing,
}))(withRouter(HomeMenu));
