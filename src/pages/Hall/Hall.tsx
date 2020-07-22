import React from 'react';

const source = [
  {
    localdata: [] = [],
    datatype: 'array',
    datafields:
    [
      { name: 'column0', type: 'string' },
      { name: 'column1', type: 'string' },
      { name: 'column2', type: 'string' },
      { name: 'column3', type: 'string' },
      { name: 'column4', type: 'string' },
    ],
  },
];

const imagerenderer = (row, datafield, value) => `<img id="${row}-${datafield}" style="margin-top: 20%;margin-left: 22%" height="60" width="70" src="${value}"/>`;

const columns = [
  { text: 'column0', datafield: 'column0', width: 120, cellsrenderer: imagerenderer },
  { text: 'column1', datafield: 'column1', width: 120, cellsrenderer: imagerenderer },
  { text: 'column2', datafield: 'column2', width: 120, cellsrenderer: imagerenderer },
  { text: 'column3', datafield: 'column3', width: 120, cellsrenderer: imagerenderer },
  { text: 'column4', datafield: 'column4', width: 120, cellsrenderer: imagerenderer },
];


const Hall = ({ hallId, repertoryId }) => {
  debugger;
  return <div />;
};

export default Hall;
