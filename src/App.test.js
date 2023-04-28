import { render, screen } from '@testing-library/react';
import { TmdbConfig } from './setup/app-config';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
//   console.log("test working")

// });
test('should first', () => { 
  console.log(process.env.REACT_APP_TMDB_API_REGION)
 })