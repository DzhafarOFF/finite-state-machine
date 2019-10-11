class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.state = config.initial;
        this.config = config;
        this.history = [];
        this.changes = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states.hasOwnProperty(state)){
            this.history.push(this.state);
            this.state = state;
            this.changes = [];
        } else {
            throw new Error;
        }
        
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.state].transitions.hasOwnProperty(event)) {
            this.changes = [];
            return this.changeState(this.config.states[this.state].transitions[event]);
        } else {
            throw new Error;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) return Object.keys(this.config.states);
        let eventStates = [];
        Object.keys(this.config.states).forEach(state => {
            if (this.config.states[state].transitions.hasOwnProperty(event)) {
                eventStates.push(state);
            }
        })
        return eventStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length === 0) return false;
        this.changes.push(this.state);
        this.state = this.history[this.history.length - 1];
        this.history.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.changes.length === 0) return false;
        this.history.push(this.state);
        this.state = this.changes[this.changes.length - 1];
        this.changes.pop();
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
