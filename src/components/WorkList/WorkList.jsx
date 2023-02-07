import css from './WorkList.module.css';
import PropTypes from 'prop-types';

const WorkList = ({ works, deleteWork }) => (
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Time</th>
        <th>Place</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody className={css.list}>
      {works.map(({ id, date, time, place, notes }) => (
        <tr key={id} className={css.item}>
          <td className={css.name}>{date}</td>
          <td className={css.name}>{time}</td>
          <td className={css.number}>{place}</td>
          <td className={css.number}>{notes}</td>
          <td>
            <button
              className={css.button}
              type="submit"
              onClick={() => deleteWork(id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

WorkList.propTypes = {
  works: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
      time: PropTypes.string,
      place: PropTypes.string,
      notes: PropTypes.string,
    }).isRequired
  ),
  deleteWork: PropTypes.func.isRequired,
};

export default WorkList;
