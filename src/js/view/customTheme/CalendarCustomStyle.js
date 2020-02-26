import {Style} from '@flexio-oss/stylist'

/**
 * @interface
 */
export class CalendarCustomStyle extends Style {

  /**
   * @return {string}
   */
  square() {
    throw new Error('should be override')
  }

}

/**
 *
 * @param instance
 * @return {boolean}
 */
export const isCalendarCustom = (instance) => instance instanceof CalendarCustomStyle
