import {ViewMounterConfig} from './ViewMounterConfig'
import {assertType} from '@flexio-oss/assert'
import {ViewContainerParameters} from '@flexio-oss/hotballoon'
import {ViewContainerCalendar} from '../../view/ViewContainerCalendar'

export class ViewMounter {

  constructor() {
    /**
     *
     * @type {?ViewContainerCalendar}
     * @private
     */
    this.__viewContainer = null
  }

  /**
   *
   * @param {ViewMounterConfig} viewMounterConfig
   * @return {ViewMounter}
   */
  buildView(viewMounterConfig) {
    assertType(
      viewMounterConfig instanceof ViewMounterConfig,
      'ViewMounter:buildView: `viewMounterConfig` argument should be a ViewMounterConfig'
    )
    this.__viewContainer = new ViewContainerCalendar(
      new ViewContainerParameters(
        viewMounterConfig.getComponentContext(),
        viewMounterConfig.getComponentContext().nextID(),
        viewMounterConfig.getParentNode()
      ),
      viewMounterConfig.getStoresContainer(),
      viewMounterConfig.getActionsContainer(),
      viewMounterConfig.getDateGenerator(),
      viewMounterConfig.getFirstDay(),
      viewMounterConfig.getStyles(),
      viewMounterConfig.getStates()
    )

    assertType(
      this.__viewContainer instanceof ViewContainerCalendar,
      '`rowsContainer` should be ViewContainerSvg'
    )

    this.__viewContainer.renderAndMount()

    return this
  }

  /**
   * @return {?ViewContainerCalendar}
   */
  viewContainer() {
    return this.__viewContainer
  }
}

