import { connect } from 'react-redux';
import { getReservations } from 'actions/reservationActions';
import { deleteUser, signOut } from 'actions/userActions';
import Profile from './Profile';

const mapPropsToState = (state) => ({
  reservations: state.reservations.reservations,
  deleteStatusCode: state.users.deleteStatusCode,
});

export default connect(mapPropsToState, { getReservations, deleteUser, signOut })(Profile);
