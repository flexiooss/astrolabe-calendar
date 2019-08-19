import {ViewPublicEventHandler, EventListenerOrderedBuilder} from '@flexio-oss/hotballoon'
import {assertType, isFunction} from '@flexio-oss/assert'

export const NEXT_MONTH = 'NEXT_MONTH'
export const PREVIOUS_MONTH = 'PREVIOUS_MONTH'
export const UPDATE_DATE_PICKED = 'UPDATE_DATE_PICKED'

export class EventRegister extends ViewPublicEventHandler {
  /**
   *
   * @param {function} clb
   * @return {String}
   */
  nextMonth(clb) {
    assertType(
      isFunction(clb),
      'EventRegister:nextMonth: `clb` should be a function'
    )
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(NEXT_MONTH)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }

  /**
   *
   * @param {function} clb
   * @return {String}
   */
  previousMonth(clb) {
    assertType(
      isFunction(clb),
      'EventRegister:previousMonth: `clb` should be a function'
    )
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(PREVIOUS_MONTH)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }

  /**
   *
   * @param {function} clb
   * @return {String}
   */
  updateDatePicked(clb) {
    assertType(
      isFunction(clb),
      'EventRegister:updateDatePicked: `clb` should be a function'
    )
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(UPDATE_DATE_PICKED)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }
}