/*global defineSuite*/
defineSuite([
             'DynamicScene/TimeIntervalCollectionProperty',
             'Core/Cartesian3',
             'Core/JulianDate',
             'Core/TimeInterval',
             'Core/TimeIntervalCollection'
     ], function(
             TimeIntervalCollectionProperty,
             Cartesian3,
             JulianDate,
             TimeInterval,
             TimeIntervalCollection) {
    "use strict";
    /*global jasmine,describe,xdescribe,it,xit,expect,beforeEach,afterEach,beforeAll,afterAll,spyOn,runs,waits,waitsFor*/

    it('default constructor has expected values', function() {
        var property = new TimeIntervalCollectionProperty();
        expect(property.intervals).toBeInstanceOf(TimeIntervalCollection);
        expect(property.getValue(new JulianDate())).toBeUndefined();
    });

    it('works with basic types', function() {
        var interval1 = new TimeInterval(new JulianDate(10, 0), new JulianDate(12, 0), true, true, 5);
        var interval2 = new TimeInterval(new JulianDate(12, 0), new JulianDate(14, 0), false, true, 6);

        var property = new TimeIntervalCollectionProperty();
        property.intervals.addInterval(interval1);
        property.intervals.addInterval(interval2);

        expect(property.getValue(interval1.start)).toBe(interval1.data);
        expect(property.getValue(interval2.stop)).toBe(interval2.data);
    });

    it('works with clonable objects', function() {
        var interval1 = new TimeInterval(new JulianDate(10, 0), new JulianDate(12, 0), true, true, new Cartesian3(1, 2, 3));
        var interval2 = new TimeInterval(new JulianDate(12, 0), new JulianDate(14, 0), false, true, new Cartesian3(4, 5, 6));

        var property = new TimeIntervalCollectionProperty();
        property.intervals.addInterval(interval1);
        property.intervals.addInterval(interval2);

        var result1 = property.getValue(interval1.start);
        expect(result1).not.toBe(interval1.data);
        expect(result1).toEqual(interval1.data);

        var result2 = property.getValue(interval2.stop);
        expect(result2).not.toBe(interval2.data);
        expect(result2).toEqual(interval2.data);
    });

    it('works with a result parameter', function() {
        var interval1 = new TimeInterval(new JulianDate(10, 0), new JulianDate(12, 0), true, true, new Cartesian3(1, 2, 3));
        var interval2 = new TimeInterval(new JulianDate(12, 0), new JulianDate(14, 0), false, true, new Cartesian3(4, 5, 6));

        var property = new TimeIntervalCollectionProperty();
        property.intervals.addInterval(interval1);
        property.intervals.addInterval(interval2);

        var expected = new Cartesian3();
        var result1 = property.getValue(interval1.start, expected);
        expect(result1).toBe(expected);
        expect(result1).toEqual(interval1.data);

        var result2 = property.getValue(interval2.stop, expected);
        expect(result2).toBe(expected);
        expect(result2).toEqual(interval2.data);
    });

    it('throws with no time parameter', function() {
        var property = new TimeIntervalCollectionProperty();
        expect(function() {
            property.getValue(undefined);
        }).toThrow();
    });

    it('equals works for differing basic type intervals', function() {
        var interval1 = new TimeInterval(new JulianDate(10, 0), new JulianDate(12, 0), true, true, 5);
        var interval2 = new TimeInterval(new JulianDate(12, 0), new JulianDate(14, 0), false, true, 6);

        var left = new TimeIntervalCollectionProperty();
        left.intervals.addInterval(interval1);
        left.intervals.addInterval(interval2);

        var right = new TimeIntervalCollectionProperty();
        right.intervals.addInterval(interval1);

        expect(left.equals(right)).toEqual(false);
        right.intervals.addInterval(interval2);
        expect(left.equals(right)).toEqual(true);
    });

    it('equals works for differing complex type intervals', function() {
        var interval1 = new TimeInterval(new JulianDate(10, 0), new JulianDate(12, 0), true, true, new Cartesian3(1, 2, 3));
        var interval2 = new TimeInterval(new JulianDate(12, 0), new JulianDate(14, 0), false, true, new Cartesian3(4, 5, 6));

        var left = new TimeIntervalCollectionProperty();
        left.intervals.addInterval(interval1);
        left.intervals.addInterval(interval2);

        var right = new TimeIntervalCollectionProperty();
        right.intervals.addInterval(interval1);

        expect(left.equals(right)).toEqual(false);
        right.intervals.addInterval(interval2);
        expect(left.equals(right)).toEqual(true);
    });
});