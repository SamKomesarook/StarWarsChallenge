import { render, screen } from '@testing-library/react';
import { HelloWorld } from './HelloWorld';
import { ApolloProvider } from '@apollo/client';
import { client } from '../../lib/apollo';

describe('HelloWorld', () => {
  it('renders correctly with default value', () => {
    const page = render(
      <ApolloProvider client={client}>
        <HelloWorld />
      </ApolloProvider>
    );
    expect(page).toMatchSnapshot();
  });
});
