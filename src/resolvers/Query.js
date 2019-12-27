function feed(root, context, info) {
  return context.prisma.links()
}
function users(root, context, info) {
  return context.prisma.users()
}
function hello(root, context, info) {
  return 'Hello world!'
}

module.exports = {
  feed,
  hello,
  users
}