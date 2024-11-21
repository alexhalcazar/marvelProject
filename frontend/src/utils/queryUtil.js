export const createFilterObject = (
    costs,
    powers,
    character,
    series,
    sortFilters
) => {
    const filterObject = {};
    if (costs.includes(7) || powers.includes(7)) {
        let object = {};
        // nested queries for our $and mongodb operator
        const items = [];
        if (character) {
            object['character'] = '^' + character;
            items.push(object);
        }
        if (series !== 'all') {
            object['series'] = series;
            items.push(object);
        }
        if (costs.length > 0) {
            if (costs.includes(7)) {
                object['$or'] = [
                    { cost: { $in: costs } },
                    { cost: { $gt: 6 } }
                ];
            } else {
                object['cost'] = { $in: costs };
            }
            items.push(object);
        }
        if (powers.length > 0) {
            if (powers.includes(7)) {
                object['$or'] = [
                    { power: { $in: powers } },
                    { power: { $gt: 6 } }
                ];
            } else {
                object['power'] = { $in: powers };
            }
            items.push(object);
        }
        filterObject['$and'] = items;
    } else {
        if (character) {
            filterObject['character'] = '^' + character;
        }
        if (costs.length > 0) {
            filterObject['cost'] = { $in: costs };
        }
        if (powers.length > 0) {
            filterObject['power'] = { $in: powers };
        }
        if (series !== 'all') {
            filterObject['series'] = series;
        }
    }
    if (sortFilters.includes(1) || sortFilters.includes(-1)) {
        filterObject['sorting'] = sortFilters;
    }
    return filterObject;
};
