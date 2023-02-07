import React, { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';

import WorkForm from './WorkForm/WorkForm';
import WorkList from './WorkList/WorkList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    works: [],
    filter: '',
  };

  addContact = ({ place, notes }) => {
    const normalizationWork = place.toLowerCase();

    const alreadyInWorks = this.state.works.some(
      ({ place }) => place.toLocaleLowerCase() === normalizationWork
    );
    if (alreadyInWorks) {
      alert(`${place} is already in works.`);
      return;
    }

    const newWork = {
      place: place,
      notes: notes,
      id: nanoid(),
    };

    this.setState(prevState => ({
      works: [...prevState.works, newWork],
    }));
  };

  getWorks = () => {
    const { works, filter } = this.state;
    const normalizationFilter = filter.toLowerCase();

    return works.filter(work =>
      work.place.toLowerCase().includes(normalizationFilter)
    );
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteWork = workId => {
    this.setState(prevState => ({
      works: prevState.works.filter(work => work.id !== workId),
    }));
  };

  componentDidMount() {
    const list = localStorage.getItem('works-list');
    if (!list) return;

    try {
      this.setState({
        works: JSON.parse(list),
      });
    } catch (e) {
      console.error(e);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.works.length !== this.state.works.length) {
      const worksListStringified = JSON.stringify(this.state.works);
      localStorage.setItem('works-list', worksListStringified);
    }
  }

  render() {
    const { filter, works } = this.state;
    const visibleWorks = this.getWorks();

    return (
      <div className={css.box}>
        <h2 className={css.title}>Work Timer</h2>
        <WorkForm onSubmit={this.addWork} />
        <h2 className={css.title}>Works List</h2>
        {works.length > 0 ? (
          <>
            <Filter value={filter} onChange={this.changeFilter} />
            <WorkList works={visibleWorks} deleteWork={this.deleteWork} />
          </>
        ) : (
          <h2 className={css['empty-list']}>Work list is empty</h2>
        )}
      </div>
    );
  }
}

export default App;
