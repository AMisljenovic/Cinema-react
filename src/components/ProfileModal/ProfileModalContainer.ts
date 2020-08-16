import { connect } from 'react-redux';
import { updateUser, clearAction } from 'actions/userActions';
import ProfileModal from './ProfileModal';

const mapPropsToState = (state) => ({
  updateStatusCode: state.users.updateStatusCode,
});

export default connect(mapPropsToState, { updateUser, clearAction })(ProfileModal);
