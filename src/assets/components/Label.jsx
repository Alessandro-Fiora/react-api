export default function Label({ children }) {
  return <span className={"label " + children.toLowerCase()}>{children}</span>;
}
