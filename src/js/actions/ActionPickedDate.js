import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import { ActionDispatcherBuilder, TypeCheck } from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionPickedDate {
  /**
   * @private
   * @param {ActionDispatcher<PickedDate, PickedDateBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionPickedDate}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionDateChangedPublic:create: `dispatcher` should be a Dispatcher'
    )
    return new ActionPickedDate(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.astrolabe_calendar.actions.PickedDate)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {ActionDispatcher<PickedDate, PickedDateBuilder>} actionDateChangedPublic
   * @param {Store<SelectedMonth>} storeSelectedMonth
   * @returns {ActionPickedDate}
   */
  listen(componentContext, actionDateChangedPublic, storeSelectedMonth) {
    assertType(!isNull(this.__action),
      'ActionDateChangedPublic:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {UpdatePickedDate} payload
       */
      (payload) => {
        let pickedDate = DateExtended.fromFlexDate(payload.date())
        pickedDate.setDate(1)
        pickedDate.setHours(0, 0, 0, 0)
        if ((DateExtended.fromFlexDate(storeSelectedMonth.state().data().month()).getMonth() !== pickedDate.getMonth()) ||
          (DateExtended.fromFlexDate(storeSelectedMonth.state().data().month()).getFullYear() !== pickedDate.getFullYear())) {
          storeSelectedMonth.set(
            storeSelectedMonth.state().data()
              .withMonth(pickedDate.toLocaleFlexDate())
          )
        }

        actionDateChangedPublic.dispatch(
          actionDateChangedPublic.payloadBuilder()
            .date(payload.date())
            .build()
        )
      },
      componentContext
    )
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<PickedDate, PickedDateBuilder>}
   */
  action() {
    return this.__action
  }
}
