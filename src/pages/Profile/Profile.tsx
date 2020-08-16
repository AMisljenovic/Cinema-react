import React, { useState, useEffect, useRef } from 'react';
import { navigate } from 'hookrouter';
import './Profile.css';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxPasswordInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxpasswordinput';
import JqxGrid, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import ProfileModal from 'components/ProfileModal';

const source: any = [
  {
    localdata: [],
    datatype: 'array',
    datafields: [
      { name: 'movieTitle', type: 'string' },
      { name: 'dateTime', type: 'string' },
      { name: 'row', type: 'string' },
      { name: 'column', type: 'string' },
      { name: 'price', type: 'string' },
    ],
  },
];

const columns = [
  { text: 'Movie Title', datafield: 'movieTitle', width: '250' },
  { text: 'Date Time', datafield: 'dateTime', width: '160' },
  { text: 'Row', datafield: 'row' },
  { text: 'Column', datafield: 'column' },
  { text: 'Price', datafield: 'price' },
];

const reservationsToRemove: any[] = [];
let user:any;

const Profile = ({ getReservations, reservations, deleteUser, deleteStatusCode,
  signOut, deleteReservations, deleteReservationsStatusCode, clearAction, updateUser, updateStatusCode }) => {
  const [dataAdapter, setDataAdapter] = useState<any>(null);
  const [reservationsToRemoveLength, setReservationsToRemoveLength] = useState(0);
  const [confrimDeletion, setConfrimDeletion] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const jqxPassword = useRef<JqxPasswordInput>(null);
  const jqxGrid = useRef<JqxGrid>(null);

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

    getReservations(user.id);
  }, []);

  useEffect(() => {
    if (reservations.length > 0) {
      const sortedReservations = reservations
        .sort((a, b) => {
          const dateA = new Date(a.dateTime).getTime();
          const dateB = new Date(b.dateTime).getTime();

          return dateA - dateB;
        })
        .sort((a, b) => a.time > b.time)
        .map(res => {
          res.price += ' din.';
          return res;
        });

      source.localdata = sortedReservations;
      setDataAdapter(new jqx.dataAdapter(source));
    }
  }, [reservations]);

  useEffect(() => {
    if (deleteStatusCode === 200) {
      alert('Your account has been successfully deleted.');
      sessionStorage.removeItem('user');
      signOut();
      navigate('/home');
    } else if (deleteStatusCode === 401) {
      setWrongPassword(true);
    }
  }, [deleteStatusCode]);

  useEffect(() => {
    if (deleteReservationsStatusCode === 200) {
      if (jqxGrid.current) {
        jqxGrid.current.clearselection();
        getReservations(user.id);
        setReservationsToRemoveLength(0);

        alert('Reservation(s) successfully removed');
        clearAction();
      }
    } else if (deleteReservationsStatusCode === 401) {
      redirectToLogin();
    }
  }, [deleteReservationsStatusCode]);

  const confirm = () => {
    if (jqxPassword.current) {
      const password = jqxPassword.current.val();
      const deletionRequest = {
        username: user.username,
        email: user.email,
        password,
      };

      deleteUser(deletionRequest);
    }
  };

  const gridOnRowSelect = (event) => {
    if (jqxGrid.current) {
      const rowData = jqxGrid.current.getrowdata(event.args.rowindex);
      reservationsToRemove.push(rowData);
      setReservationsToRemoveLength(reservationsToRemoveLength + 1);
    }
  };

  const gridOnRowUnselect = (event) => {
    if (jqxGrid.current) {
      const rowData = jqxGrid.current.getrowdata(event.args.rowindex);
      const index = reservationsToRemove.findIndex(res => res.reservationId === rowData.reservationId);

      if (index > -1) {
        reservationsToRemove.splice(index, 1);
        setReservationsToRemoveLength(reservationsToRemoveLength - 1);
      }
    }
  };

  const deleteSelectedReservations = () => {
    const reservationIds = reservationsToRemove.map(
      res => res.reservationId,
    );

    deleteReservations(reservationIds);
  };

  return (
    <div className="profile">
      <div className="profile-data">
        <div className="fields">
          <h2>
            {user && user.name}
            {' '}
            {user && user.surname}
          </h2>
          <h2>
            Username:
            {' '}
            {user && user.username}
          </h2>
          <h2>
            Email:
            {' '}
            {user && user.email}
          </h2>
          <JqxButton
            template="warning"
            width="150"
            height="20"
            onClick={() => setOpenModal(true)}
          >
            Edit
          </JqxButton>
        </div>
        <div className="delete-user">
          <JqxButton
            className="delete-button"
            template="warning"
            width="150"
            height="20"
            onClick={() => setConfrimDeletion(!confrimDeletion)}
          >
            Delete user
          </JqxButton>
          {confrimDeletion && (
            <div className="password">
              <h3>Confirm Password:</h3>
              <JqxPasswordInput
                width="200"
                height="30"
                placeHolder=""
                ref={jqxPassword}
              />
              { wrongPassword && <h6>Password doesn&apos;t match</h6> }
            </div>
          ) }
          {confrimDeletion && (
            <div className="confirm">
              <JqxButton
                style={{ marginLeft: '10%' }}
                template="danger"
                width="150"
                height="20"
                onClick={confirm}
              >
                Confirm
              </JqxButton>
            </div>
          )}
        </div>
      </div>
      <div className="reservations">
        <div className="table">
          <JqxGrid
            ref={jqxGrid}
            width="800"
            height="450"
            source={dataAdapter}
            selectionmode="multiplerows"
            columns={columns}
            onRowselect={event => gridOnRowSelect(event)}
            onRowunselect={event => gridOnRowUnselect(event)}
          />
        </div>
        <div className="delete-reservations">
          <JqxButton
            disabled={reservationsToRemoveLength === 0}
            template="danger"
            width="250"
            height="30"
            onClick={() => { if (reservationsToRemoveLength > 0) { deleteSelectedReservations(); } }}
          >
            <span>Remove reservations</span>
          </JqxButton>
        </div>
      </div>
      {openModal && <ProfileModal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Profile;
