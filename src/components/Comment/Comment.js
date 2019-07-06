import React from 'react';

const comment = ({item}) => <div key={item.id}>{item.text}</div>;

export default comment;
