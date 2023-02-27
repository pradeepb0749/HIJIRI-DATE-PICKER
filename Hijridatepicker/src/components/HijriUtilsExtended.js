import HijriUtils from "@date-io/hijri";

export default class HijriUtilsExtended extends HijriUtils {
  constructor() {
    super();
    // Make it ar-SA to show everything in Arabic
    this.locale = "en-gb";
  }

  getCalendarHeaderText = function (date) {
    return date.locale(this.locale).format("iMMMM iYYYY");
  };

  getDatePickerHeaderText = function (date) {
    return date.locale(this.locale).format("dddd, iD iMMM");
  };
  // Get the months array in hijri.
  getMonthArray = function (date) {
    const firstMonth = date.clone().locale(this.locale).startOf("iYear");
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(prevMonth.clone().add(1, "iMonth"));
    }

    return monthArray;
  };
  // Set month in Hijri.
  setMonth = function (date, count) {
    return date.clone().iMonth(count);
  };

  format = function (date, format) {
    // This is to show Hijri months instead of Arabic translation of Gregorian months
    // MMM is hardcoded in the uidatepicker library for months, moment-hijri
    // needs in the iMMMM format to show hijri months, we will replace here.
    return format === "MMM" ? date.format("iMMM") : date.format(format);
  };

  getYearRange = function (start, end) {
    // moment-hijri only supports dates between 1356-01-01 H and 1499-12-29 H
    // We need to throw if outside min/max bounds, otherwise the while loop below will be infinite.
    if (start.isBefore("1937-03-14")) {
      throw new Error("min date must be on or after 1356-01-01 H (1937-03-14)");
    }
    if (end.isAfter("2076-11-26")) {
      throw new Error(
        "max date must be on or before 1499-12-29 H (2076-11-26)"
      );
    }
    var startDate = this.moment(start).locale(this.locale).startOf("iYear");
    var endDate = this.moment(end).locale(this.locale).endOf("iYear");
    var years = [];
    var current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, "iYear");
    }
    return years;
  };

  getDayText = function (date) {
    return date.locale(this.locale).format("iD");
  };
}
