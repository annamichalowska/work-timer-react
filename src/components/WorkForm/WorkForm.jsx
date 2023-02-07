import React, { Component } from 'react';
import css from './WorkForm.module.css';

class WorkForm extends Component {
  state = {
    place: '',
    notes: '',
  };

  handleChange = evt => {
    const { place, value } = evt.target;
    this.setState({ [place]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
    this.clearForm();
  };

  clearForm = () => {
    this.setState(() => ({
      place: '',
      notes: '',
    }));
  };

  render() {
    const { place, notes } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <div className={css['button-box']}>
          <button className={css.button} type="submit">
            START
          </button>
          <button className={css.button} type="submit">
            STOP
          </button>
          <button className={css.button} type="submit">
            FINISH
          </button>
        </div>
        <label className={css.label}>
          <input
            className={css.input}
            placeholder="Place work"
            id={this.loginInputId}
            onChange={this.handleChange}
            value={place}
            type="text"
            name="place"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={css.label}>
          <input
            className={css.input}
            placeholder="Notes"
            onChange={this.handleChange}
            value={notes}
            type="tel"
            name="notes"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </form>
    );
  }
}

export default WorkForm;
