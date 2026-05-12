import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the todo list header', () => {
    render(<App />);
    const headerElement = screen.getByText(/To-Do List/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the add task button', () => {
    render(<App />);
    const addButton = screen.getByText(/Add New Task/i);
    expect(addButton).toBeInTheDocument();
  });

  it('renders the sample task', () => {
    render(<App />);
    const sampleTask = screen.getByText(/Sample Task/i);
    expect(sampleTask).toBeInTheDocument();
  });
});
