import {ComponentCalendar} from './ComponentCalendar'
import {assertType} from '@flexio-oss/assert'

const __component = Symbol('__componentCalendarPublic')

export class ComponentCalendarPublic {
  /**
   *
   * @param {ComponentCalendar} component
   */
  constructor(component) {
    assertType(component instanceof ComponentCalendar,
      'ComponentCalendarPublic:constructor: `component` should be a ComponentCalendar'
    )
    /**
     * @private
     * @property {ComponentCalendar} ComponentCalendarPublic.__component
     */
    this[__component] = component
  }

  /**
   *
   * @param {FlexDate} date
   */
  setDate(date) {
    return this[__component].setDate(date)
  }

  /**
   *
   * @returns {FlexDate}
   */
  getDate() {
    return this[__component].getDate()
  }

  /**
   * @callback callback
   * @param {Function} callback
   */
  listenDateSelected(callback) {
    this[__component].listenDateSelected(callback)
  }
}
