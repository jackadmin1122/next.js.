import { nextTestSetup } from 'e2e-utils'

describe('private-folder-convention', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  it('should not type check page convention on _private folder', async () => {
    const $ = await next.render$('/')
    expect($('p').text()).toBe('hello world')
  })
})
