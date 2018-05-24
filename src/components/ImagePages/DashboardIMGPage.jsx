import React, { Component } from 'react';

class DashboardIMGPage extends Component {
  render() {
    return (
      <div style={{
        width: '1338px',
        margin: 'auto',
        position: 'relative',
      }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/Hero-Dashboard.png`}
          style={{
          position: 'relative',
          display: 'block',
        }}
        />
        <a
          style={{
          position: 'absolute',
          width: '145.83px',
          height: '31.81px',
          top: '602px',
          left: '618px',
        }}
          href="customization"
        />
      </div>
    );
  }
}

export default DashboardIMGPage;
