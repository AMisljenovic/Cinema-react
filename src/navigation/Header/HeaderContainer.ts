import { connect } from 'react-redux';
import { signOut } from 'actions/userActions';
import Header from './Header';

const mapPropsToState = (state) => ({
  statusCode: state.users.statusCode,
  loginResponse: state.users.loginResponse,
});

export default connect(mapPropsToState, { signOut })(Header);
