import { connect } from 'react-redux';

import styles from './styles.scss';

import { Login } from 'screens/Login';
import { WaitingRoom } from 'screens/WaitingRoom';
import { Game } from 'screens/Game';
import { Results } from 'screens/Results';
import { AdminControls } from 'screens/AdminControls';
import { WithQuizController } from 'containers/WithQuizController';

import { selectStep } from 'store/app/selectors';
import { selectAdmin } from 'store/user/selectors';

export const AppComponent = ({ step, admin }) => {
  return (
    <div className={styles.app}>
      <WithQuizController>
        {step === 'login' && <Login />}
        {step === 'waiting' && <WaitingRoom />}
        {step === 'game' && <Game />}
        {step === 'results' && <Results />}
        {admin && <AdminControls />}
      </WithQuizController>
    </div>
  );
};

const mapStateToProps = (state) => ({
  step: selectStep(state),
  admin: selectAdmin(state),
});

export const App = connect(mapStateToProps)(AppComponent);
