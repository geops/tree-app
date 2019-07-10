import React from 'react';
import propTypes from 'prop-types';

const styles = {
  position: 'fixed',
  bottom: '35px',
  backgroundColor: '#8b0e00',
  right: '-41px',
  transform: 'rotate(-45deg)',
  zIndex: '10',
  lineHeight: '24px',
};

const textStyle = {
  border: 'dotted',
  color: 'white',
  fontSize: '14px',
  fontFamily: 'Sans-Serif',
  fontWeight: 'bold',
  padding: '0 70px',
  textAlign: 'center',
  letterSpacing: '3px',
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
