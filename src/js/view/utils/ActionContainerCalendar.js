import {TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'

export class ActionContainerCalendar {
  /**
   *
   * @param {ActionDispatcher<NextMonth, NextMonthBuilder>} actionNextMonth
   * @param {ActionDispatcher<PreviousMonth, PreviousMonthBuilder>} actionPreviousMonth
   * @param {ActionDispatcher<PickedDate, PickedDateBuilder>} actionUpdatePickedDate
   */
  constructor(actionNextMonth, actionPreviousMonth, actionUpdatePickedDate) {
    assertType(actionNextMonth.isTypeOf(globalFlexioImport.io.flexio.astrolabe_calendar.actions.NextMonth),
      'ActionContainerCalendar:constructor: `actionNextMonth` should be an Action of NextMonth'
    )
    this.__actionNextMonth = TypeCheck.assertIsActionDispatcher(actionNextMonth)

    assertType(actionPreviousMonth.isTypeOf(globalFlexioImport.io.flexio.astrolabe_calendar.actions.PreviousMonth),
      'ActionContainerCalendar:constructor: `actionPreviousMonth` should be an Action of PreviousMonth'
    )
    this.__actionPreviousMonth = TypeCheck.assertIsActionDispatcher(actionPreviousMonth)

    console.log(actionUpdatePickedDate)
    assertType(actionUpdatePickedDate.isTypeOf(globalFlexioImport.io.flexio.astrolabe_calendar.actions.PickedDate),
      'ActionContainerCalendar:constructor: `actionUpdatePickedDate` should be an Action of UpdatePickedDate'
    )
    this.__actionUpdatePickedDate = TypeCheck.assertIsActionDispatcher(actionUpdatePickedDate)
  }

  /**
   *
   * @return {ActionDispatcher<NextMonth, NextMonthBuilder>}
   */
  actionNextMonth() {
    return this.__actionNextMonth
  }

  /**
   *
   * @return {ActionDispatcher<PreviousMonth, PreviousMonthBuilder>}
   */
  actionPreviousMonth() {
    return this.__actionPreviousMonth
  }

  /**
   *
   * @return {ActionDispatcher<UpdatePickedDate, UpdatePickedDateBuilder>}
   */
  actionUpdatePickedDate() {
    return this.__actionUpdatePickedDate
  }
}
