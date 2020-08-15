import React, { useEffect, useState, useRef } from 'react';
import { navigate } from 'hookrouter';
import './Hall.css';
import seatImageUrl from 'assets/seat.png';
import projectorScreen from 'assets/project-screen.png';
import JqxGrid, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import SeatPosition from 'models/seat-position.model';
import Modal from 'react-bootstrap/Modal';
import Reservation from 'models/reservation.model';

const source: any = [
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

const getCellColor = (userSeats, allSetas, row, column) => {
  if (userSeats[row][column] === 1) {
    return 'dodgerblue';
  }
  if (allSetas[row][column] === 1) {
    return '#FFC700';
  }

  return 'none';
};

const imagerenderer = (row, datafield, value, column, userSeats, allSeats) => `<div style="height: 100%;width: 100%;
background-color:${getCellColor(userSeats, allSeats, row, column)}">
<img id="${row}-${datafield}" style="margin-top: 20%;margin-left: 22%;height="60" width="70" src="${value}"/></div>`;

const columns = (userResSetas, allSeats) => [
  { text: 'column0', datafield: 'column0', width: 120, cellsrenderer: (row, datafield, value) => imagerenderer(row, datafield, value, 0, userResSetas, allSeats) },
  { text: 'column1', datafield: 'column1', width: 120, cellsrenderer: (row, datafield, value) => imagerenderer(row, datafield, value, 1, userResSetas, allSeats) },
  { text: 'column2', datafield: 'column2', width: 120, cellsrenderer: (row, datafield, value) => imagerenderer(row, datafield, value, 2, userResSetas, allSeats) },
  { text: 'column3', datafield: 'column3', width: 120, cellsrenderer: (row, datafield, value) => imagerenderer(row, datafield, value, 3, userResSetas, allSeats) },
  { text: 'column4', datafield: 'column4', width: 120, cellsrenderer: (row, datafield, value) => imagerenderer(row, datafield, value, 4, userResSetas, allSeats) },
];

const seatPosition: SeatPosition[] = [];
let user: any;

const Hall = ({ hallId, repertoryId, getRepertoryById, getSeatsReservations, getHall, postReservations,
  postReservationStatusCode, reservationStatusCode,
  seats, userReservedSeats, repertory, hall }) => {
  const jqxGrid = useRef<JqxGrid>(null);
  const [totalSelectedSeats, setTotalSelectedSeats] = useState(0);
  const [reservationLimit, setReservationLimit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataAdapter, setDataAdapter] = useState<any>(null);
  const [testColumns, setTestColumns] = useState<any>([]);

  const redirectToLogin = () => {
    alert('You are not authorized to access this page. You will be redirected to sign in page');
    sessionStorage.removeItem('user');
    navigate('/signin');
  };

  const fetchAllData = () => {
    getRepertoryById(repertoryId);
    getSeatsReservations(repertoryId, user.id);
    getHall(hallId);
  };

  useEffect(() => {
    const data = sessionStorage.getItem('user');
    if (data === null) {
      redirectToLogin();
    }
    user = JSON.parse(data || '{}');

    console.log('Use effect 1');

    fetchAllData();
  }, []);

  useEffect(() => {
    console.log('Use effect 2');

    if (hall) {
      hallRender(hall);
      console.log('Use effect 2: hall render');
    }
  }, [hall]);

  useEffect(() => {
    console.log('Use effect 3: set test columns');

    if (userReservedSeats && userReservedSeats.length > 0 && seats && seats.length > 0) {
      setTestColumns(columns(userReservedSeats, seats));
    }
  }, [seats, userReservedSeats]);

  // useEffect(() => {
  //   if (reservationStatusCode === 401) {
  //     redirectToLogin();
  //   }
  // }, [reservationStatusCode]);

  // useEffect(() => {
  //   console.log('Use effect 3');

  //   if (postReservationStatusCode === 200) {
  //     getReservationsByRepertoryAndUserId(repertoryId, user.id);
  //     cellsRendered = true;
  //   }
  // }, [postReservationStatusCode]);

  const hallRender = (hallProp) => {
    const seatRender: any[] = [];
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

    setDataAdapter(new jqx.dataAdapter(source));
  };

  const reservationsOverLimit = () => {
    let numberOfReservations = 0;

    for (let i = 0; i < 5; i++) {
      for (let y = 0; y < 5; y++) {
        numberOfReservations = userReservedSeats[i][y] === 1 ? numberOfReservations + 1 : numberOfReservations;
      }
    }

    return (numberOfReservations + seatPosition.length) > 50;// todo
  };

  const cellSelected = (event) => {
    const seatRow = +event.args.rowindex;
    const seatColumn = +event.args.datafield.split('column')[1];

    if (seats[seatRow][seatColumn] === 1 || userReservedSeats[seatRow][seatColumn] === 1) {
      if (jqxGrid.current) {
        jqxGrid.current.unselectcell(event.args.rowindex, event.args.datafield);
      }
      return;
    }
    seatPosition.push({ row: seatRow, column: seatColumn });
    setTotalSelectedSeats(seatPosition.length);
  };

  const cellUnselected = (event) => {
    const seatRow = +event.args.rowindex;
    const seatColumn = +event.args.datafield.split('column')[1];

    const index = seatPosition.findIndex(seat => seat.row === seatRow && seat.column === seatColumn);

    if (index > -1) {
      seatPosition.splice(index, 1);
      setTotalSelectedSeats(seatPosition.length);
    }
  };

  const openModal = () => {
    if (reservationsOverLimit()) {
      setReservationLimit(true);
      return;
    }

    setReservationLimit(false);
    setModalIsOpen(true);
  };

  const reserve = () => {
    const reservations: Reservation[] = [];
    seatPosition.forEach(seat => {
      reservations.push({
        id: '',
        repertoryId,
        seatRow: seat.row,
        seatColumn: seat.column,
        userId: user.id,
        date: repertory.date,
        playTime: repertory.playTime,
      });
    });

    postReservations(reservations);

    const unselectCell: any[] = [];

    seatPosition.forEach(seat => unselectCell.push({ row: seat.row, column: columns(userReservedSeats, seats)[seat.column].datafield }));

    unselectCell.forEach(cell => {
      if (jqxGrid.current) {
        jqxGrid.current.unselectcell(cell.row, cell.column);
      }
    });

    setModalIsOpen(false);
    fetchAllData();
  };

  if (seats.length > 0 && userReservedSeats.length > 0 && repertory && hall) {
    return (
      <div className="hall-wrapper">
        <div className="legend">
          <h1>
            Hall
            {hall.name}
          </h1>
          <div className="legend-items">
            <div className="wrapper legend-available">
              <h3>Available</h3>
            </div>
            <div className="wrapper legend-reserved">
              <h3>Reserved</h3>
            </div>
            <div className="wrapper legend-reserved-by-you">
              <h3>Resereved by you</h3>
            </div>
          </div>
          <div className="button">
            <JqxButton
              roundedCorners="all"
              disabled={totalSelectedSeats === 0}
              template="inverse"
              width={180}
              height={35}
              onClick={openModal}
            >
              Click here to reserve selected seats
            </JqxButton>
            {reservationLimit && <h6>You cannot have more than 4 reservations per show</h6>}
          </div>
        </div>
        <div className="hall">
          <img className="projector" src={projectorScreen} alt="" />
          <JqxGrid
            className="jqx-grid"
            ref={jqxGrid}
            source={dataAdapter}
            columns={testColumns}
            showstatusbar={false}
            rowsheight={110}
            autoheight={true}
            editable={false}
            selectionmode="multiplecells"
            showheader={false}
            onCellselect={cellSelected}
            onCellunselect={cellUnselected}
          />
        </div>
        <Modal show={modalIsOpen}>
          <div className="modal-wrapper">
            <div className="seats">
              <h3>Selected seats</h3>

              <ul>
                {seatPosition.map(position => <li>{`row: ${position.row}, column: ${position.column}`}</li>)}
              </ul>
              <h3>
                Total:
                {' '}
                {seatPosition.length * repertory.price}
                {' '}
                din.
              </h3>
            </div>
            <div className="action">
              <JqxButton
                className="jqx-button"
                roundedCorners="all"
                template="success"
                width="180"
                height="20"
                onClick={reserve}
              >
                Reserve
              </JqxButton>
              <JqxButton
                className="jqx-button"
                roundedCorners="all"
                template="danger"
                width="180"
                height="20"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </JqxButton>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  return <div />;
};

export default Hall;
