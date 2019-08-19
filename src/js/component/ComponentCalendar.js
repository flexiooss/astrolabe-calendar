import '../../../import'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {StoreDatePickedUtils} from '../stores/StoreDatePickedUtils/StoreDatePickedUtils'
import {ComponentAstrolabeBuilder} from '@flexio-oss/astrolabe'
import {DaysEnum} from '@flexio-oss/astrolabe/src/js/types/DaysEnum'
import {assert} from '@flexio-oss/assert'
import {ActionInitCalendarUtils} from '../actions/ActionInitCalendar/ActionInitCalendarUtils'
import {StoreSelectedMonthUtils} from '../stores/StoreSelectedMonthUtils/StoreSelectedMonthUtils'
import {ActionPreviousMonthUtils} from '../actions/ActionPreviousMonth/ActionPreviousMonthUtils'
import {ActionNextMonthUtils} from '../actions/ActionNextMonth/ActionNextMonthUtils'
import {ActionUpdatePickedDateUtils} from '../actions/ActionUpdatePickedDate/ActionUpdatePickedDateUtils'
import {ViewContainerCalendarUtils} from '../view/container/ViewContainerCalendarUtils'

const InitCalendarBuilder = globalFlexioImport.io.flexio.astrolabe_calendar.actions.InitCalendarBuilder

export class ComponentCalendar {
  /**
   *
   * @param {ComponentContext} componentContext
   */
  constructor(componentContext) {
    assert(TypeCheck.isComponentContext(componentContext),
      'ComponentAstrolabe:constructor: `componentContext` argument should be ComponentContext'
    )
    this.__componentContext = componentContext

    this.__actionInitCalendar = new ActionInitCalendarUtils().init(this.__componentContext.dispatcher())
    this.__actionPrevisousMonth = new ActionPreviousMonthUtils().init(this.__componentContext.dispatcher())
    this.__actionUpdatePickedDate = new ActionUpdatePickedDateUtils().init(this.__componentContext.dispatcher())
    this.__actionNextMonth = new ActionNextMonthUtils().init(this.__componentContext.dispatcher())

    this.__storeDatePiked = new StoreDatePickedUtils().build(this.__componentContext)
    this.__storeSelectedMonth = new StoreSelectedMonthUtils().build(this.__componentContext)
    this.__dateGenerator = ComponentAstrolabeBuilder.build(this.__componentContext.APP(), DaysEnum.MON)

    this.__actionInitCalendar.listen(this.__storeDatePiked.store(), this.__storeSelectedMonth.store(), this.__dateGenerator)
    this.__actionNextMonth.listen(this.__storeSelectedMonth.store(), this.__dateGenerator)
    this.__actionPrevisousMonth.listen(this.__storeSelectedMonth.store(), this.__dateGenerator)
    this.__actionUpdatePickedDate.listen(this.__storeDatePiked.store(), this.__storeSelectedMonth.store(), this.__dateGenerator)

    this.__actionInitCalendar.action().dispatch(
      new InitCalendarBuilder().build()
    )
  }

  mountView(parentNode) {
    new ViewContainerCalendarUtils(
      this.__componentContext,
      parentNode,
      this.__storeDatePiked.storePublic(),
      this.__storeSelectedMonth.storePublic(),
      this.__actionNextMonth.action(),
      this.__actionPrevisousMonth.action(),
      this.__actionUpdatePickedDate.action(),
      this.__dateGenerator
    ).init()
  }
}
