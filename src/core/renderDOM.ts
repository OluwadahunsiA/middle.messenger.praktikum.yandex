import Block from "./Block";

export default function renderDOM(block: Block, query: string) {
  const rootElement: Element | null = document.querySelector(`#${query}`);

  const blockContent = block.getContent();

  if (rootElement && blockContent) {
    rootElement.appendChild(blockContent);

    block.dispatchComponentDidMount();
  }

  return rootElement;
}
