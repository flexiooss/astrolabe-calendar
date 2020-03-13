export class State {
  /**
   *
   * @param {PublicStoreHandler} store
   * @param style
   * @param {StateType} name
   */
  constructor(store, style, name) {
    this.__store = store
    this.__style = style
    this.__name = name
  }

  /**
   *
   * @returns {PublicStoreHandler}
   */
  store() {
    return this.__store
  }

  style() {
    return this.__style
  }

  /**
   *
   * @returns {StateType}
   */
  name() {
    return this.__name
  }
}

export class StateBuilder {
  constructor() {
    this.__store = null
    this.__style = null
    this.__name = null
  }

  /**
   *
   * @param {PublicStoreHandler<DateList>} value
   * @return {StateBuilder}
   */
  store(value) {
    this.__store = value
    return this
  }

  /**
   * 
   * @param value
   * @returns {StateBuilder}
   */
  style(value) {
    this.__style = value
    return this
  }

  /**
   *
   * @param{StateType} value
   * @return {StateBuilder}
   */
  name(value) {
    this.__name = value
    return this
  }

  build() {
    return new State(this.__store, this.__style, this.__name)
  }
}