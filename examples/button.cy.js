import SButton from '@simple-ui/components/button'

describe('<App />', () => {
  it('renders', () => {
    cy.mount(SButton, {
      slots: {
        default: 'Button',
      }}
    )
    cy.screenshot('button--normal')
  })
})