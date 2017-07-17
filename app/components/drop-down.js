import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['drop-down'],

  actions: {
    hide() {
      this.get('hide')();
    },
    what() {
      this.get('what')();
    },
    when() {
      this.get('when')();
    },
    howMuch() {
      this.get('howMuch')();
    }
  },

  rentalName: Ember.computed('rental', function() {
    const rental = this.get('rental');

    if (rental && rental.get('name')) {
      return rental.get('name');
    }
    else {
      return "Anything";
    }
  }),

  dateRange: Ember.computed('range', function() {
    const range = this.get('range');

    if (!range || !range.start || !range.end) {
      return 'Anytime';
    }

    if (range.start.month() === range.end.month()) {
      return `${range.start.format("MMM DD")} - ${range.end.format("DD")}`;
    }
    else {
      return `${range.start.format("MMM DD")} - ${range.end.format("MMM DD")}`;
    }
  }),

  rentalCost: Ember.computed('rental', 'range', function() {
    const rental = this.get('rental');
    const range = this.get('range');

    if (!range       ||
        !range.start ||
        !range.end   ||
        !rental      ||
        !rental.get('dailyRate')) { return ''; }

    const daysInRange = range.end.diff(range.start, 'days');
    const dailyPrice  = Number.parseFloat(rental.get('dailyRate'));

    return daysInRange * dailyPrice;
  })
});
