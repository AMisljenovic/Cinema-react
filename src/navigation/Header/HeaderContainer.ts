import { connect } from 'react-redux';
import { signOut, loggedInAsAdmin } from 'actions/userActions';
import Header from './Header';

const mapPropsToState = (state) => ({
  statusCode: state.users.statusCode,
  adminStatusCode: state.users.adminStatusCode,
  loginResponse: state.users.loginResponse,
});

export default connect(mapPropsToState, { signOut, loggedInAsAdmin })(Header);
