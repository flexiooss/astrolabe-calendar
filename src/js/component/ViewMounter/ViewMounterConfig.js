import {assertType, isNode} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {ActionContainerCalendar} from '../../view/utils/ActionContainerCalendar'
import {StoreContainerCalendar} from '../../view/utils/StoreContainerCalendar'

export class ViewMounterConfig {
  constructor() {
    this.__componentContext = null
    this.__storesContainer = null
    this.__actionsContainer = null
    this.__parentNode = null
    this.__dateGenerator = null
    this.__firstDay = null
    this.__styles = null
    this.__states = null
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @return {ViewMounterConfig}
   */
  componentContext(componentContext) {
    assertType(
      TypeCheck.isComponentContext(componentContext),
      'ViewMounterConfig:componentContext: `componentContext` argument should be a ComponentContext, %s given',
      typeof this.__componentContext
    )
    this.__componentContext = componentContext
    return this
  }

  /**
   *
   * @param {StoreContainerCalendar} storesContainer
   * @return {ViewMounterConfig}
   */
  storesContainer(storesContainer) {
    assertType(
      storesContainer instanceof StoreContainerCalendar,
      'ViewMounterConfig:storesContainer:  `storesContainer` should be StoreContainerCalendar'
    )
    this.__storesContainer = storesContainer
    return this
  }

  /**
   *
   * @param {ActionContainerCalendar} actionsContainer
   * @return {ViewMounterConfig}
   */
  actionsContainer(actionsContainer) {
    assertType(
      actionsContainer instanceof ActionContainerCalendar,
      'ViewMounterConfig:actionsContainer:  `actionsContainer` should be ActionContainerCalendar'
    )
    this.__actionsContainer = actionsContainer
    return this
  }

  /**
   *
   * @param {Element} parentNode
   * @return {ViewMounterConfig}
   */
  parentNode(parentNode) {
    assertType(!!isNode(parentNode),
    'ViewMounterConfig:parentNode: `parentNode` argument should be a NodeType, %s given',
    typeof parentNode
  )
    this.__parentNode = parentNode
    return this
  }

  /**
   *
   * @param {ComponentAstrolabePublic} dateGenerator
   * @return {ViewMounterConfig}
   */
  dateGenerator(dateGenerator) {
    this.__dateGenerator = dateGenerator
    return this
  }

  /**
   *
   * @param {DaysEnum} firstDay
   * @return {ViewMounterConfig}
   */
  firstDay(firstDay) {
    this.__firstDay = firstDay
    return this
  }

  /**
   *
   * @param {ThemeStyle} styles
   * @returns {ViewMounterConfig}
   */
  styles(styles) {
    this.__styles = styles
    return this
  }

  /**
   *
   * @param states
   * @returns {ViewMounterConfig}
   */
  states(states) {
    this.__states = states
    return this
  }
  
  getComponentContext() {
    return this.__componentContext
  }

  getStoresContainer() {
    return this.__storesContainer
  }

  getActionsContainer() {
    return this.__actionsContainer
  }

  getParentNode() {
    return this.__parentNode
  }

  getDateGenerator() {
    return this.__dateGenerator
  }

  getFirstDay() {
    return this.__firstDay
  }

  getStyles() {
    return this.__styles
  }

  getStates() {
    return this.__states
  }
}
