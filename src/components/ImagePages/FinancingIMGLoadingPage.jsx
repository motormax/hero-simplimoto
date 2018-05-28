import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import imageUrl from './FinancingLoading.png';
import IMGPage from './IMGPage';

class FinancingIMGLoadingPage extends Component {
  static propTypes = {
    continueFlow: propTypes.func.isRequired,
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.props.continueFlow();
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <IMGPage imgUrl={imageUrl} />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  continueFlow: () => dispatch(push('/financing-options-img')),
});

export default connect(undefined, mapDispatchToProps)(FinancingIMGLoadingPage);
