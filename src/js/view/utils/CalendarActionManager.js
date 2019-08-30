import {TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'

export class CalendarActionManager {
  /**
   *
   * @param {ActionDispatcher<NextMonth>} actionNextMonth
   * @param {ActionDispatcher<PreviousMonth>} actionPreviousMonth
   * @param {ActionDispatcher<UpdatePickedDate>} actionUpdatePickedDate
   */
  constructor(actionNextMonth, actionPreviousMonth, actionUpdatePickedDate) {
    assertType(actionNextMonth.isTypeOf(globalFlexioImport.io.flexio.astrolabe_calendar.actions.NextMonth),
      'CalendarActionManager:constructor: `actionNextMonth` should be an Action of NextMonth'
    )
    this.__actionNextMonth = TypeCheck.assertIsActionDispatcher(actionNextMonth)

    assertType(actionPreviousMonth.isTypeOf(globalFlexioImport.io.flexio.astrolabe_calendar.actions.PreviousMonth),
      'CalendarActionManager:constructor: `actionPreviousMonth` should be an Action of PreviousMonth'
    )
    this.__actionPreviousMonth = TypeCheck.assertIsActionDispatcher(actionPreviousMonth)

    assertType(actionUpdatePickedDate.isTypeOf(globalFlexioImport.io.flexio.astrolabe_calendar.actions.UpdatePickedDate),
      'CalendarActionManager:constructor: `actionUpdatePickedDate` should be an Action of UpdatePickedDate'
    )
    this.__actionUpdatePickedDate = TypeCheck.assertIsActionDispatcher(actionUpdatePickedDate)
  }

  /**
   *
   * @return {ActionDispatcher<NextMonth>}
   */
  actionNextMonth() {
    return this.__actionNextMonth
  }

  /**
   *
   * @return {ActionDispatcher<PreviousMonth>}
   */
  actionPreviousMonth() {
    return this.__actionPreviousMonth
  }

  /**
   *
   * @return {ActionDispatcher<UpdatePickedDate>}
   */
  actionUpdatePickedDate() {
    return this.__actionUpdatePickedDate
  }
}
