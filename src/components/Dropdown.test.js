import React from 'react';
import renderer from 'react-test-renderer';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  test('should match snapshot.', () => {
    const component = renderer.create(
      <Dropdown
        label="testlabel"
        values={['a', 'b', 'c']}
        onChange={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
