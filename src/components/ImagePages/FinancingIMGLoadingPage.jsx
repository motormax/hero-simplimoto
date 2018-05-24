import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import imageUrl from './FinancingLoading.png';

class FinancingIMGLoadingPage extends Component {
  static propTypes = {
    continueFlow: propTypes.func.isRequired,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.continueFlow();
    }, 3000);
  }

  render() {
    return (
      <div style={{
        margin: 'auto',
        position: 'relative',
        width: '2000px',
        textAlign: 'center',
      }}
      >
        <img
          src={imageUrl}
          alt=""
          style={{
            display: 'inline',
            width: '100%',
            position: 'relative',
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  continueFlow: () => dispatch(push('/financing-options-img')),
});

export default connect(undefined, mapDispatchToProps)(FinancingIMGLoadingPage);
