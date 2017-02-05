class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.states = config.states;
      this.activeState = this.initial = config.initial;
      this.history = [];
      this.undoHistory = [];
      
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (this.states[state]) {
        this.history.push(this.activeState);
        this.activeState = state; 
        this.undoHistory = [];
        }
      else {
        throw new Error();
        
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (this.states[this.activeState].transitions[event]) {
          this.changeState(this.states[this.activeState].transitions[event]);
        }
      else { 
        throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.activeState = this.initial;
      this.clearHistory();
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      let array = [];
      if (event == undefined) {
        return Object.keys(this.states);
      }
      else {
        if(this.states.normal.transitions.hasOwnProperty(event)) {
          array.push('normal');
        }
        if(this.states.busy.transitions.hasOwnProperty(event)) {
          array.push('busy');
        }
        if(this.states.hungry.transitions.hasOwnProperty(event)) {
          array.push('hungry');
        }
        if(this.states.sleeping.transitions.hasOwnProperty(event)) {
          array.push('sleeping');
        }
        return array;
      }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.history.length > 0) {
        let prevactiveState = this.history.pop();
        this.undoHistory.push(this.activeState);
        this.activeState = prevactiveState;
        return true;
        } 
      else{
        return false;
      }
        
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.undoHistory.length > 0) {
        let prevUndoState = this.undoHistory.pop();
        this.history.push(this.activeState);
        this.activeState = prevUndoState;
        return true;
      }else {
        return false;

      }
        
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.history = [];
      this.undoHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
