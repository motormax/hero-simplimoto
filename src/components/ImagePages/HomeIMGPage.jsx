import React, { Component } from 'react';

class HomeIMGPage extends Component {
  render() {
    return (
      <div style={{
        width: '1338px',
        margin: 'auto',
        position: 'relative',
      }}
      >
        <img
          style={{
          position: 'relative',
          display: 'block',
        }}
          src={`${process.env.PUBLIC_URL}/img/Home.png`}
        />
        <a
          style={{
          position: 'absolute',
          width: '158.12px',
          height: '46.59px',
          top: '659.74px',
          left: '409.97px',
        }}
          href="dashboard-img"
        />
      </div>
    );
  }
}

export default HomeIMGPage;
