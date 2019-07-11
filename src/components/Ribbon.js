import React from 'react';
import propTypes from 'prop-types';

const styles = {
  position: 'fixed',
  bottom: '35px',
  backgroundColor: '#b3372b',
  right: '-51px',
  transform: 'rotate(-45deg)',
  zIndex: '10',
  lineHeight: '24px',
  opacity: '0.8',
  boxShadow: 'rgba(123, 85, 85, 0.85) 0px 0px 10px 0px',
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
