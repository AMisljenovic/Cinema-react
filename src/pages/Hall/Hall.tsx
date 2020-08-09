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
let cellsRendered = true;
const seatPosition: SeatPosition[] = [];
let user: any;

const Hall = ({ hallId, repertoryId, getRepertoryById, getReservationsByRepertoryId,
  getReservationsByRepertoryAndUserId, getHall, postReservations, postReservationStatusCode, reservationStatusCode,
  seats, userReservedSeats, repertory, hall }) => {
  const jqxGrid = useRef<JqxGrid>(null);
  const [totalSelectedSeats, setTotalSelectedSeats] = useState(0);
  const [reservationLimit, setReservationLimit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

    const elements = Array.from(document.getElementsByClassName('jqx-grid-cell jqx-item'));
    elements.forEach(element => {
      const converted = element as HTMLElement;
      converted.style.border = 'none';
    });
  }, []);

  useEffect(() => {
    if (reservationStatusCode === 401) {
      redirectToLogin();
    }
  }, [reservationStatusCode]);

  useEffect(() => {
    if (postReservationStatusCode === 200) {
      getReservationsByRepertoryAndUserId(repertoryId, user.id);
      cellsRendered = true;
    }
  }, [postReservationStatusCode]);

  const hallRender = (hallProp) => {
    for (let index = 0; index < hallProp.columns; index++) {
      const columnPropName = `column${index}`;
      columnPropNames.push(columnPropName);
    }
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

    dataAdapter = new jqx.dataAdapter(source);
  };

  const renderSeats = () => {
    if (seats && userReservedSeats && cellsRendered) {
      for (let i = 0; i < 5; i++) {
        for (let y = 0; y < 5; y++) {
          if (userReservedSeats[i][y] === 1) {
            const cell = document.getElementById(`${i}-column${y}`) as HTMLElement;
            if (cell && cell.parentElement) {
              cell.parentElement.style.backgroundColor = 'dodgerblue';
            }
          } else if (seats[i][y] === 1) {
            const cell = document.getElementById(`${i}-column${y}`) as HTMLElement;
            if (cell && cell.parentElement) {
              cell.parentElement.style.backgroundColor = '#FFC700';
            }
          }
        }
      }

      cellsRendered = false;
    }
  };

  const reservationsOverLimit = () => {
    let numberOfReservations = 0;

    for (let i = 0; i < 5; i++) {
      for (let y = 0; y < 5; y++) {
        numberOfReservations = userReservedSeats[i][y] === 1 ? numberOfReservations + 1 : numberOfReservations;
      }
    }

    return (numberOfReservations + seatPosition.length) > 4;
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

    seatPosition.forEach(seat => unselectCell.push({ row: seat.row, column: columns[seat.column].datafield }));

    unselectCell.forEach(cell => {
      if (jqxGrid.current) {
        jqxGrid.current.unselectcell(cell.row, cell.column);
      }
    });
  };

  if (seats.length > 0 && userReservedSeats.length > 0 && repertory && hall) {
    hallRender(hall);
    renderSeats();

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
            columns={columns}
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
