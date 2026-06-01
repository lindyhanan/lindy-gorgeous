export default function Card({
  children,
}) {
  return (
    <div className="bg-white rounded-[30px] p-6 shadow">
      {children}
    </div>
  );
}