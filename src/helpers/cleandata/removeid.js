const safeResource = (resourceObject) => {
  const { id, ...rest } = resourceObject;
  // console.log(...rest);
  // check for properties
  // within `rest` object
  Object.entries(rest).forEach((property) => {
    const propertyValue = rest[property];
    if (Array.isArray(propertyValue)) {
      rest[property] = rest[property].map(safeResource);
    } else if (typeof propertyValue === 'object') {
      rest[property] = safeResource(propertyValue);
    }
  });
  return resourceObject;
};

// function safeResource(resourceObject) {
//   const { id, ...rest } = resourceObject;
//   console.log(rest);
//   for (const property of Object.entries(rest)) {
//     const propertyValue = rest[property];

//     if (Array.isArray(propertyValue)) {
//       rest[property] = rest[property].map(safeResource);
//     } else if (typeof propertyValue === 'object') {
//       rest[property] = safeResource(propertyValue);
//     }
//   }
//   return resourceObject;
// }

// function filterObject(obj, key) {
//   const { id, ...rest } = obj;
//     for (var i in Object.entries(obj) {
//         if (!obj.hasOwnProperty(i)) continue;
//         if (typeof obj[i] == 'object') {
//             filterObject(obj[i], key);
//         } else if (i == key) {
//             delete key;
//         }
//     }
//     return obj;
// }

module.exports = {
  safeResource,
  // filterObject,
};

// remove the id from an object
// go through object properties
// if object property is array, go through array elements & make them safe
// if object property is object, make it safe directly
