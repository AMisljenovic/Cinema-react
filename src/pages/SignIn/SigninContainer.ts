import { connect } from 'react-redux';
import { signIn } from 'actions/userActions';
import Signin from './Signin';

const mapPropsToState = (state) => ({
  loginResponse: state.users.loginResponse,
  statusCode: state.users.statusCode,
});

export default connect(mapPropsToState, { signIn })(Signin);
