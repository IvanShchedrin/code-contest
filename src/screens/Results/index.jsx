import { connect } from 'react-redux';
import { selectResults } from 'store/app/selectors';

export const ResultsComponent = ({ results }) => (
  <>
    Результаты:
    {results && results.map((user) => (
      <div key={user.id}>
        <img src={user.avatar} alt="" />
        {' '}
        {user.name}
        {' '}
        {user.score}
      </div>
    ))}
  </>
);

const mapStateToProps = (state) => ({
  results: selectResults(state),
})

export const Results = connect(mapStateToProps)(ResultsComponent);
