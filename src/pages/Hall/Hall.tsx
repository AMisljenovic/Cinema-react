import React, { useEffect } from 'react';
import { navigate } from 'hookrouter';
import './Hall.css';
import seatImageUrl from 'assets/seat.png';

const source = [
  {
    localdata: [],
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
const columnPropNames: string[] = [];

let dataAdapter: any;

const Hall = ({ hallId, repertoryId, getRepertoryById, getReservationsByRepertoryId,
  getReservationsByRepertoryAndUserId, getHall, reservationStatusCode,
  seats, userReservedSeats, repertory, hall }) => {
  let user: any;

  const redirectToLogin = () => {
    alert('You are not authorized to access this page. You will be redirected to sign in page');
    sessionStorage.removeItem('user');
    navigate('/signin');
  };

  useEffect(() => {
    const data = sessionStorage.getItem('user');
    if (data === null) {
      redirectToLogin();
    }
    user = JSON.parse(data || '{}');

    getRepertoryById(repertoryId);
    getReservationsByRepertoryId(repertoryId);
    getReservationsByRepertoryAndUserId(repertoryId, user.id);
    getHall(hallId);
  }, []);

  useEffect(() => {
    if (reservationStatusCode === 401) {
      redirectToLogin();
    }
  }, [reservationStatusCode]);

  const hallrender = (hallProp) => {
    for (let index = 0; index < hallProp.columns; index++) {
      const columnPropName = `column${index}`;
      columnPropNames.push(columnPropName);
    }
    const seatRender: string[] = [];
    for (let index = 0; index < hallProp.rows; index++) {
      const row = {
        column0: seatImageUrl,
        column1: seatImageUrl,
        column2: seatImageUrl,
        column3: seatImageUrl,
        column4: seatImageUrl,
      };

      seatRender.push(row);
    }


    source.localdata = seatRender;
    dataAdapter = new jqx.dataAdapter(source);
  };


  if (seats.length > 0 && userReservedSeats.length > 0 && repertory && hall) {

  }


  debugger;
  return <div />;
};

export default Hall;
