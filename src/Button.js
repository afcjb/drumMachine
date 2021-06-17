export default function Button({ className, value, onClick, text }) {
  console.log(arguments[0].children);
  return (
    <button className={className} value={value} onClick={() => onClick()}>
      {arguments[0].children}
    </button>
  );
}
