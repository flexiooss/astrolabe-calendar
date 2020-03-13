import {BorderStyle, styleSheetMediaAll} from '@flexio-oss/js-style-theme-interface'
import {CalendarCustomStyle} from './CalendarCustomStyle'

/**
 * @implements {BorderStyle}
 */
export class CalendarCustomStyleImpl extends CalendarCustomStyle {
  constructor() {
    super()

    this._addStyleRules(
      this._cssBuilder([this.square()])
        .styleSheetMediaRules(
          styleSheetMediaAll,
          {
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            flex: '1 0 calc(12%)',
            'line-height': '0px'
          }
        )
        .build()
      ,
      this._cssBuilder([this.square() + ':after'])
        .styleSheetMediaRules(
          styleSheetMediaAll,
          {
            content: '""',
            display: 'block',
            'padding-bottom': '100%'
          }
        )
        .build()
      ,
      this._cssBuilder([this.headerSpaceBetween()])
        .styleSheetMediaRules(
          styleSheetMediaAll,
          {
            'justify-content': 'space-between'
          }
        )
        .build()
    )
  }

  /**
   * @return {string}
   */
  square() {
    return this._selector('.calendar-square')
  }

  /**
   *
   * @return {string}
   */
  headerSpaceBetween() {
    return this._selector('.calendar-header-space-between')
  }
}
