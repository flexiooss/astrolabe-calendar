import {TypeCheck, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {isNode, assertType} from '@flexio-oss/assert'
import {ContainerStore} from '../ContainerStore'
import {ViewContainerCalendar} from './ViewContainerCalendar'
import {ContainerAction} from '../ContainerAction'

export class ViewContainerCalendarUtils {
  constructor(componentContext, parentNode, storeDatePicked, storeSelectedMonth, actionNextMonth, actionPreviousMonth, actionUpdatePickedDate, dateGenerator) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'ViewContainerFilterUtils:constructor: `componentContext` should be a ComponentContext'
    )
    assertType(isNode(parentNode),
      'ViewContainerFilterUtils:constructor: `parentNode` should be a Node'
    )
    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__viewContainerID = componentContext.nextID()
    this.__storeDatePicked = storeDatePicked
    this.__storeSelectedMonth = storeSelectedMonth
    this.__actionNextMonth = actionNextMonth
    this.__actionPreviousMonth = actionPreviousMonth
    this.__actionUpdatePickedDate = actionUpdatePickedDate
    this.__dateGenerator = dateGenerator
    this.__viewContainer = null
  }

  /**
   *
   * @returns {ViewContainerCalendarUtils}
   */
  init() {
    this.__viewContainer = this.__componentContext.addViewContainer(
      new ViewContainerCalendar(
        new ViewContainerParameters(
          this.__componentContext,
          this.__viewContainerID,
          this.__parentNode
        ),
        new ContainerStore(this.__storeDatePicked, this.__storeSelectedMonth),
        new ContainerAction(this.__actionNextMonth, this.__actionPreviousMonth, this.__actionUpdatePickedDate),
        this.__dateGenerator
      )
    )

    this.__viewContainer.renderAndMount(this.__parentNode)
    return this
  }

  /**
   *
   * @returns {String}
   */
  ID() {
    return this.__viewContainerID
  }

  /**
   *
   * @returns {ViewContainer<ViewContainerCalendar>}
   */
  viewContainer() {
    return this.__viewContainer
  }
}
