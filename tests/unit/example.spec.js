import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import CardTitle from '@/components/CardTitle.vue'
import CardText from '@/components/CardText.vue'
import CardJumbotron from '@/components/CardJumbotron.vue'
import MapField from '@/components/MapField.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('Cards', () => {
  it ('renders card title', () => {
    const title = 'My title'
    const wrapper = shallowMount(CardTitle, {
      slots: {
        default: title
      }
    })

    expect(wrapper.text()).toMatch(title)
  })

  it ('renders card text', () => {
    const text = 'This is some text'
    const wrapper = shallowMount(CardText, {
      slots: {
        default: text
      }
    })

    expect(wrapper.text()).toMatch(text)
  })

  it ('renders card jumbotron', () => {
    const jumbotron = 'My jumbotron text'
    const wrapper = shallowMount(CardJumbotron, {
      slots: {
        default: jumbotron
      }
    })

    expect(wrapper.text()).toMatch(jumbotron)
  })
})
