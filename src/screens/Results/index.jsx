import { connect } from 'react-redux';
import { selectResults } from 'store/app/selectors';
import styles from './styles.scss';

export const ResultsComponent = ({ results }) => (
  <div className={styles.component}>
    <div className={styles.title}>
      Результаты:
    </div>
    {results && [...results].sort((a, b) => b.score - a.score).map((user) => (
      <div className={styles.user} key={user.id}>
        <img src={user.avatar} alt="" />
        <div className={styles.name}>
          {user.name}
        </div>
        <div className={styles.score}>
          {user.score}
        </div>
      </div>
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  results: selectResults(state),
})

export const Results = connect(mapStateToProps)(ResultsComponent);
