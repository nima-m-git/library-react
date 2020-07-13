const generateID = (function () {
    let id = 0;
    function newID() {
        console.log('generating ID')
        return id++;
    }
    return {newID}
  })();

  export {generateID}