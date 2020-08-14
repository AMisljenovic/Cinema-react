import { connect } from 'react-redux';
import { getRepertoryById } from 'actions/repertoryActions';
import Hall from 'pages/Hall/Hall';
import { getHall } from 'actions/hallActions';
import { postReservations, getSeatsReservations } from 'actions/reservationActions';

const mapPropsToState = (state) => ({
  repertory: state.repertoires.repertory,
  reservationStatusCode: state.reservations.reservationStatusCode,
  postReservationStatusCode: state.reservations.postReservationStatusCode,
  seats: state.reservations.seats,
  userReservedSeats: state.reservations.userReservedSeats,
  hall: state.halls.hall,
});

export default connect(mapPropsToState, {
  getHall,
  postReservations,
  getRepertoryById,
  getSeatsReservations })(Hall);
