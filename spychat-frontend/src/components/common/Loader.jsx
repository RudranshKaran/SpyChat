export default function Loader({ label = "Securing channel" }) {
  return (
    <div className="loader">
      <div className="loader-ring animate-secure" />
      <span>{label}</span>
    </div>
  );
}
