import { fireEvent, render, screen } from "@testing-library/react";
import fixture from "models/fixtures/RepositoryResponse";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://api.github.com/*", (req, res, ctx) => {
    return res(ctx.json(fixture));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders results", async () => {
  render(<App />);
  const firstResult = await screen.findByText(fixture.items[0].name);
  const secondToLastResult = await screen.findByText(
    fixture.items[fixture.items.length - 2].name
  );

  expect(firstResult).toBeInTheDocument();
  expect(secondToLastResult).toBeInTheDocument();
});

test("increments star number on click", async () => {
  render(<App />);
  const firstResultFavButton = await screen.findByText(
    fixture.items[0].stargazers_count
  );

  fireEvent.click(firstResultFavButton);

  expect(firstResultFavButton).toHaveTextContent(
    String(fixture.items[0].stargazers_count + 1)
  );
});

test("hides languages that are filtered out", async () => {
  render(<App />);
  await screen.findAllByText(fixture.items[0].name);
  const select = screen.getByTestId("language-select");
  const firstTypeScriptLabel = screen.getAllByText("TypeScript")[0];

  expect(firstTypeScriptLabel).toBeVisible();

  fireEvent.change(select, { target: { value: ["Go"] } });

  expect(firstTypeScriptLabel).not.toBeVisible();
});
