let EventEmitter = require('events').EventEmitter

class DBAdapter extends EventEmitter {
  constructor(options) {
    this.name = options.name
  }

  static createDBAdapters(dbAdapters) {
    let ret = []
    for (let dbAdapter of dbAdapters) {
      ret.push(new DBAdapter(dbAdapter))
    }
    return ret
  }

  initialize(callback) {
    process.nextTick(() => {
      super.emit('done')
    })
  }
}

module.exports = DBAdapter

let dbAdapters = DBAdapter.createDBAdapters([
  {name: 'mongo'},
  {name: 'postgres'}
])

for (let dbAdapter of dbAdapters) {
  // What class are these objects?
  console.log(dbAdapter.constructor.name)

  // Proof that we inherit from EventEmitter
  dbAdapter.initialize()
  dbAdapter.on('done', ()=>console.log('done'))
}
