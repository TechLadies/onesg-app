const safeResource = ({ id, ...rest }) => {
  const restDuplicate = { ...rest };
  Object.keys(rest).forEach((property) => {
    const propertyValue = rest[property];
    if (propertyValue === null) {
      // do nothing
    } else if (Array.isArray(propertyValue)) {
      restDuplicate[property] = rest[property].map(safeResource);
    } else if (typeof propertyValue === 'object') {
      restDuplicate[property] = safeResource(propertyValue);
    }
  });
  return rest;
};

module.exports = {
  safeResource,
  // filterObject,
};

// remove the id from an object
// go through object properties
// if object property is array, go through array elements & make them safe
// if object property is object, make it safe directly
