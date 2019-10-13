class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) 
            throw new Error('fatal error...config is undefined!');
        this.config = config;
        this.history = [config.initial];
        this.state = config.initial;
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
        if (state && state in this.config.states) {
            this.state = state
            this.history.push(this.state)
        } 
        else {
            throw new Error('error ! is set state.')
        }
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let flag = false;
        for (let item in this.config.states) {
            if (this.config.states[item].transitions.hasOwnProperty(event) && this.state === item) {
                this.state = this.config.states[item].transitions[event];
                if (this.history[this.history.length - 1] !== this.state) {
                    this.history.push(this.state);
                }
                flag = true;
            }
        }
        if (flag == false) 
            throw new Error('fatal Error!')
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
        let states = [];
        for (let item in this.config.states) {
            if (!event) { 
                states.push(item) 
            }
            if (this.config.states[item].transitions.hasOwnProperty(event)) {
                states.push(item)
            }
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history && this.history.length) {
            let a = this.history.lastIndexOf(this.state) - 1;
            if (a >= 0) {
                this.state = this.history[a];
                return true;
            }
            return false;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.history && this.history.length) {
            let a = this.history.lastIndexOf(this.state) + 1;
            if (a >= 1 && a < this.history.length) {
                this.state = this.history[a];
                return true;
            }
            return false;
        }
        return false;
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
