import { connect } from 'react-redux';
import { getReservations, deleteReservations, clearAction } from 'actions/reservationActions';
import { deleteUser, signOut } from 'actions/userActions';
import Profile from './Profile';

const mapPropsToState = (state) => ({
  reservations: state.reservations.reservations,
  deleteStatusCode: state.users.deleteStatusCode,
  deleteReservationsStatusCode: state.reservations.deleteReservationsStatusCode,
});

export default connect(mapPropsToState, {
  getReservations,
  deleteUser,
  signOut,
  deleteReservations,
  clearAction })(Profile);
