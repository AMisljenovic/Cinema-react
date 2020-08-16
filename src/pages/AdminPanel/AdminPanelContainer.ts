import { connect } from 'react-redux';
import { getChartData } from 'actions/reservationActions';
import AdminPanel from './AdminPanel';

const mapPropsToState = (state) => ({
  reservationStatusCode: state.reservations.reservationStatusCode,
  chartData: state.reservations.chartData,
});

export default connect(mapPropsToState, { getChartData })(AdminPanel);
