import React from 'react';

const RollText = ({ text }) => (
  <span className="roll-text font-medium text-xs md:text-sm tracking-wide text-white mix-blend-difference">
    <span className="roll-text-inner" data-text={text}>{text}</span>
  </span>
);

export default RollText;
