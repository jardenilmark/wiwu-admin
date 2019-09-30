export const getActiveKey = location => {
  console.log('Location - ', location)
  const { pathname } = location
  const paths = pathname.split('/')
  const activeKey = paths[2]
  console.log('active - ', activeKey)
  return activeKey
}
