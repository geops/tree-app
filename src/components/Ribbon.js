import React from 'react';
import propTypes from 'prop-types';

const styles = {
  position: 'fixed',
  bottom: '20px',
  backgroundColor: '#8b0e00',
  right: '-35px',
  transform: 'rotate(-45deg)',
  zIndex: '10',
};

const textStyle = {
  border: '2px solid white',
  color: 'white',
  fontSize: '14px',
  fontFamily: 'Sans-Serif',
  fontWeight: 'bold',
  margin: '2px',
  padding: '0 70px',
};

const Ribbon = ({ label }) => (
  <div style={styles}>
    <div style={textStyle}>{label}</div>
  </div>
);

Ribbon.propTypes = {
  label: propTypes.string.isRequired,
};

export default Ribbon;
