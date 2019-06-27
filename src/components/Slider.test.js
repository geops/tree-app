import React from 'react';
import renderer from 'react-test-renderer';
import Slider from './Slider';

describe('Slider', () => {
  test('should match snapshot.', () => {
    const component = renderer.create(
      <Slider label="testslider" min={0} max={100} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
