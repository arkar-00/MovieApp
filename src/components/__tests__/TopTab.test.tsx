import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import TopTab from '../top-tab-bar/TopTab'

// Test suite for the TopTab component
describe('TopTab', () => {
  // Mock tab data for testing
  const mockTabs = [
    { key: 'tab1', label: 'Tab One' },
    { key: 'tab2', label: 'Tab Two' },
  ]

  // Test that all tab labels are rendered
  it('renders all tab labels', () => {
    const { getByText } = render(
      <TopTab tabs={mockTabs} activeTab="tab1" onTabPress={jest.fn()} />,
    )

    expect(getByText('Tab One')).toBeTruthy()
    expect(getByText('Tab Two')).toBeTruthy()
  })

  // Test that onTabPress is called with the correct tab key when a tab is pressed
  it('calls onTabPress with correct tab key', () => {
    const onTabPress = jest.fn()

    const { getByText } = render(
      <TopTab tabs={mockTabs} activeTab="tab1" onTabPress={onTabPress} />,
    )

    fireEvent.press(getByText('Tab Two'))
    expect(onTabPress).toHaveBeenCalledWith('tab2')
  })

  // Test that the active style is applied to the selected tab
  it('applies active style to selected tab', () => {
    const { getByText } = render(
      <TopTab tabs={mockTabs} activeTab="tab2" onTabPress={jest.fn()} />,
    )

    const activeText = getByText('Tab Two')
    expect(activeText.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#fff' })]),
    )
  })

  // Test that the animated indicator is rendered
  it('renders animated indicator', () => {
    const { getByTestId } = render(
      <TopTab tabs={mockTabs} activeTab="tab1" onTabPress={jest.fn()} />,
    )
    expect(getByTestId('animated-indicator')).toBeTruthy()
  })
})
