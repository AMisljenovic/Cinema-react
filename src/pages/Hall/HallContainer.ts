import { connect } from 'react-redux';
import { getRepertoryById } from 'actions/repertoryActions';
import Hall from 'pages/Hall/Hall';
import { getHall } from 'actions/hallActions';

const mapPropsToState = (state) => ({
  repertory: state.repertoires.repertory,
});

export default connect(mapPropsToState, { getHall, getRepertoryById })(Hall);
