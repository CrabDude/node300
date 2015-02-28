let Sequelize = require('sequelize')
let cloudinary = require('cloudinary')

exports.destroy = function(req,res, next) {
  let chainer = new Sequelize.Utils.QueryChainer

  (async function() {
    let comments = await req.post.getComments()
    for (let comment of comments) {
      chainer.add(comment.destroy())
    }

    let attachements = await req.post.getAttachements()
    for (attachement of attachements) {
      chainer.add(attachement).destroy())
      cloudinary.api.delete_resources(attachement.public_id)
    }

    chainer.add(req.post.destroy())
    await chainer.run()
    req.flash('success', 'Post eliminado con exito.');
    res.redirect('/posts')
  }).nodeify(next)
}
