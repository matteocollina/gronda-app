import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Filter from "../components/Filter";
import renderer from 'react-test-renderer';

describe("Filter Component",()=>{
    test('funtion onPress is called only one time', async () => {
        const fn = jest.fn();
        render(<Filter title={"Jobs"} onPress={fn} />)
        fireEvent.click(screen.getByText('Jobs'))
        expect(fn).toBeCalledTimes(1)
      })

      test('renders correctly', async () => {
        const fn = jest.fn();
        const tree = renderer
            .create(<Filter title={"Jobs"} onPress={fn} testId={"Filter"}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
      })
})
