import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import imageUrl from './FinancingLoading.png';
import IMGPage from './IMGPage';
import dollarSpinner from './dollar_spinner.gif';

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
      <IMGPage imgUrl={imageUrl}>
        <img
          alt="loading"
          src={dollarSpinner}
          style={{
            position: 'absolute',
            top: 300,
            left: 562,
            width: 200,
          }}
        />
      </IMGPage>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  continueFlow: () => dispatch(push('/financing-options-img')),
});

export default connect(undefined, mapDispatchToProps)(FinancingIMGLoadingPage);
