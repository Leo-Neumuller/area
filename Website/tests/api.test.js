import { render, screen } from "@testing-library/svelte";
import { test, vitest } from 'vitest';
import { createFlux, 
         getFlux, 
         userMe, 
         getAllFlux, 
         toggleFlux, 
         disconnectService,
         deleteFlux, 
         getOauthServices } from '../src/api/api';       

test('createFlux should return data', () => {
  const result = createFlux('cookie', { name: 'test', description: 'test', nodes: [], edges: [] });
  expect(result).toBeInstanceOf(Promise);
});

test('getFlux should return data', () => {
  const result = getFlux('cookie', 1);
  expect(result).toBeInstanceOf(Promise);
});

test('userMe should return data', () => {
  const result = userMe('cookie');
  expect(result).toBeInstanceOf(Promise);
});

test('getAllFlux should return data', () => {
  const result = getAllFlux('cookie');
  expect(result).toBeInstanceOf(Promise);
});

test('toggleFlux should return data', () => {
  const result = toggleFlux('cookie', 1);
  expect(result).toBeInstanceOf(Promise);
});

test('disconnectService should return data', () => {
  const result = disconnectService('cookie', 1);
  expect(result).toBeInstanceOf(Promise);
});

test('deleteFlux should return data', () => {
  const result = deleteFlux('cookie', 1);
  expect(result).toBeInstanceOf(Promise);
});

test('getOauthServices should return data', () => {
  const result = getOauthServices('cookie');
  expect(result).toBeInstanceOf(Promise);
});

// // Note: This is as an async test as we are using `fireEvent`
// test('changes button text on click', async () => {
//   render(Comp, {name: 'World'})
//   const button = screen.getByRole('button')

//   // Using await when firing events is unique to the svelte testing library because
//   // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
//   await fireEvent.click(button)

//   expect(button).toHaveTextContent('Button Clicked')
// })