import { connect } from 'react-redux';
import { selectResults } from 'store/app/selectors';

export const ResultsComponent = ({ results }) => (
  <>
    Results:
    <pre>
      <code>
        {JSON.stringify(results, 0, 2)}
      </code>
    </pre>
  </>
);

const mapStateToProps = (state) => ({
  results: selectResults(state),
})

export const Results = connect(mapStateToProps)(ResultsComponent);
