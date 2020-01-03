import { assertType, isNull } from '@flexio-oss/assert'
import { FlexArray } from '@flexio-oss/flex-types'
import {State} from './State'
/**
 * @extends {FlexArray<?State>}
 */
class StateList extends FlexArray {
  /**
   *
   * @param {...State} args
   */
  constructor(...args) {
    super(...args)
  }

  /**
   * @param {State} index
  * @returns {InitCalendar}
   */
  get(index) {
    return this[index]
  }

  _validate(element) {
    if (!isNull(element)) {
      assertType(element instanceof State, 'element should be a State')
    }
  }
}
export { StateList }
