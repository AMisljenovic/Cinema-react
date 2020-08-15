import { connect } from 'react-redux';
import { signUp } from 'actions/userActions';
import SignUp from './SignUp';

const mapPropsToState = (state) => ({
  error: state.users.error,
  statusCode: state.users.statusCode,
});

export default connect(mapPropsToState, { signUp })(SignUp);
