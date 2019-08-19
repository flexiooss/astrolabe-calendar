import {TypeCheck} from '@flexio-oss/hotballoon'

export class ContainerAction {
  constructor(actionNextMonth, actionPreviousMonth, actionUpdatePickedDate) {
    this.__actionNextMonth = TypeCheck.assertIsActionDispatcher(actionNextMonth)
    this.__actionPreviousMonth = TypeCheck.assertIsActionDispatcher(actionPreviousMonth)
    this.__actionUpdatePickedDate = TypeCheck.assertIsActionDispatcher(actionUpdatePickedDate)
  }

  /**
   *
   * @return {ActionDispatcher<NextMonth>}
   */
  get actionNextMonth() {
    return this.__actionNextMonth
  }

  /**
   *
   * @return {ActionDispatcher<PreviousMonth>}
   */
  get actionPreviousMonth() {
    return this.__actionPreviousMonth
  }

  /**
   *
   * @return {ActionDispatcher<UpdatePickedDate>}
   */
  get actionUpdatePickedDate() {
    return this.__actionUpdatePickedDate
  }
}
