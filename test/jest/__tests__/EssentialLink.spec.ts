import { describe, expect, it } from '@jest/globals'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import EssentialLink from 'components/EssentialLink.vue'
import { QBtn } from 'quasar'

// Specify here Quasar config you'll need to test your component
installQuasarPlugin()

const mockedAxios = axios as jest.Mocked<typeof axios>
jest.mock('axios')

describe('EssentialLink', () => {
  it('sets the correct default data', () => {
    mockedAxios.get.mockResolvedValue({ data: {} })
    const wrapper = mount(EssentialLink, {
      title: 'テスト'
    })
    const { vm } = wrapper

    expect(typeof vm.counter).toBe('number')
    expect(vm.counter).toBe(0)
  })
  it('correctly updates counter when button is pressed', async () => {
    mockedAxios.get.mockResolvedValue({ data: { step: 3 } })
    const wrapper = mount(EssentialLink)
    const { vm } = wrapper
    const button = wrapper.findComponent(QBtn)
    await button.trigger('click')
    expect(vm.counter).toBe(4)
  })
})
