import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import { ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck } from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionUpdatePickedDateUtils {
  /**
   *
   */
  constructor() {
    this.__action = null
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionUpdatePickedDateUtils}
   */
  init(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionUpdatePickedDateUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    this.__action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.astrolabe_calendar.actions.UpdatePickedDate,
          /**
           *
           * @param {UpdatePickedDate} data
           * @return {UpdatePickedDate}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {UpdatePickedDate} payload
           * @return {boolean}
           */
          (payload) => {
            return true
          }
        ),
        dispatcher
      )
    )
    return this
  }

  /**
   *
   * @param {Store<StoreDatePicked>} storeDatePicked
   * @param {Store<StoreSelectedMonth>} storeSelectedMonth
   * @param dateGenerator
   * @returns {ActionUpdatePickedDateUtils}
   */
  listen(storeDatePicked, storeSelectedMonth, dateGenerator) {
    assertType(TypeCheck.isStore(storeDatePicked),
      'ActionUpdatePickedDateUtils:constructor: `storeDatePicked` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionUpdatePickedDateUtils:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {UpdatePickedDate} payload
       */
      (payload) => {
        console.log(payload.date())
        storeDatePicked.set(
          storeDatePicked.state().data
            .withDate(payload.date())
        )
        let pickedDate = DateExtended.fromFlexDate(payload.date())
        pickedDate.setDate(1)
        pickedDate.setHours(0, 0, 0, 0)
        if (DateExtended.fromFlexDate(storeSelectedMonth.state().data.month()).getMonth() !== pickedDate.getMonth()) {
          dateGenerator.addMonth(pickedDate.getFullYear(), pickedDate.getMonth() + 1)
          dateGenerator.addMonth(pickedDate.getFullYear(), pickedDate.getMonth() - 1)

          storeSelectedMonth.set(
            storeSelectedMonth.state().data
              .withMonth(pickedDate.toLocaleFlexDate())
          )
        }
      })
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<UpdatePickedDate>}
   */
  action() {
    return this.__action
  }
}
