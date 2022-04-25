/* eslint "no-alert": "off" */

/**
 * Generic function to fetch graphQL queries and mutations
 * @param query GraphQL query to be sent in the body
 * @param variables Query variable to be passed with the query. Defaults to {}
 */
export default async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();

    if (result.errors) {
      const error = result.errors[0];
      alert('Error while quering for data - ', error);
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
    return null;
  }
}
