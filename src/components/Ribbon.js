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
  opacity: '0.8',
  boxShadow: 'rgba(123, 85, 85, 0.85) 4px 1px 3px 3px',
};

const textStyle = {
  border: '2px solid white',
  color: 'white',
  fontSize: '1.3rem',
  fontWeight: 'bolder',
  padding: '0 70px',
  margin: '2px',
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
